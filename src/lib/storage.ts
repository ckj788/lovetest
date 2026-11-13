import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Redis } from '@upstash/redis';
import { assertStorageConfigured, redisCredentials, StorageConfigurationError } from './storageConfig';
export interface DuoSessionRecord {
 id: string; mode: 'talking' | 'couples' | 'friend'; partner1Token: string; partner2Token: string;
 partner1Answers: Record<string, any>; partner2Answers?: Record<string, any>;
 status: 'pending' | 'completed' | 'expired' | 'deleted'; isPaid: boolean;
 stripeSessionId?: string; amountPaid?: number; referralSource?: string;
 createdAt: number; updatedAt: number; expiresAt: number; price?: number;
}
export interface EntitlementRecord { id: string; type: 'solo' | 'duo'; isPaid: boolean; stripeSessionId?: string; amountPaid?: number; createdAt: number; updatedAt: number; }
export interface SoloRecord { id: string; token: string; answers: Record<number, string | string[]>; setup: { duration?: string; outcome?: string }; createdAt: number; expiresAt: number; price: number; }
export interface CheckoutRecord { id: string; type: 'solo' | 'duo'; targetId: string; amount: number; stripeId?: string; url?: string; paid?: boolean; refunded?: boolean; }
const credentials = redisCredentials();
const redis = credentials ? new Redis(credentials) : null;
const dir = path.join(process.cwd(), '.data');
function key() {
 const value = process.env.DATA_ENCRYPTION_KEY;
 if (value && /^[a-f0-9]{64}$/i.test(value)) return Buffer.from(value, 'hex');
 if (process.env.NODE_ENV === 'production') throw new StorageConfigurationError();
 return crypto.createHash('sha256').update('mixedsigns-local-development-only').digest();
}
function encrypt(value: unknown) {
 const iv = crypto.randomBytes(12), cipher = crypto.createCipheriv('aes-256-gcm', key(), iv);
 const data = Buffer.concat([cipher.update(JSON.stringify(value)), cipher.final()]);
 return Buffer.concat([iv, cipher.getAuthTag(), data]).toString('base64');
}
function decrypt<T>(value: string): T {
 const bytes = Buffer.from(value, 'base64'), cipher = crypto.createDecipheriv('aes-256-gcm', key(), bytes.subarray(0, 12));
 cipher.setAuthTag(bytes.subarray(12, 28));
 return JSON.parse(Buffer.concat([cipher.update(bytes.subarray(28)), cipher.final()]).toString());
}
function file(id: string) { return path.join(dir, crypto.createHash('sha256').update(id).digest('hex') + '.json'); }
function localOnly() { if (process.env.NODE_ENV === 'production') throw new StorageConfigurationError(); }
export async function putRecord(id: string, value: unknown, ttl = 30 * 86400) {
 const encrypted = encrypt(value);
 if (redis) { await redis.set(id, encrypted, { ex: ttl }); return; }
 localOnly(); fs.mkdirSync(dir, { recursive: true });
 const dest = file(id), temp = dest + '.' + generateSecureToken(4);
 fs.writeFileSync(temp, JSON.stringify({ encrypted, expiresAt: Date.now() + ttl * 1000 })); fs.renameSync(temp, dest);
}
export async function getRecord<T>(id: string): Promise<T | null> {
 assertStorageConfigured();
 if (redis) { const value = await redis.get<string>(id); return value ? decrypt<T>(value) : null; }
 localOnly(); const dest = file(id); if (!fs.existsSync(dest)) return null;
 const record = JSON.parse(fs.readFileSync(dest, 'utf8'));
 if (Date.now() >= record.expiresAt) { fs.unlinkSync(dest); return null; }
 return decrypt<T>(record.encrypted);
}
export async function removeRecord(id: string) {
 if (redis) await redis.del(id); else { localOnly(); fs.rmSync(file(id), { force: true }); }
}
const locks = new Set<string>();
export async function exclusive<T>(id: string, action: () => Promise<T>): Promise<T> {
 const owner = generateSecureToken();
 if (redis) { if (!await redis.set('lock:' + id, owner, { nx: true, ex: 60 })) throw new Error('Operation in progress. Please retry.'); }
 else { localOnly(); if (locks.has(id)) throw new Error('Operation in progress. Please retry.'); locks.add(id); }
 try { return await action(); } finally {
  if (redis) await redis.eval("if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end", ['lock:' + id], [owner]);
  else locks.delete(id);
 }
}
export function generateSecureToken(length = 24) { return crypto.randomBytes(length).toString('hex'); }
export function generateSessionId() { return 'ms_' + generateSecureToken(16); }
export async function saveDuoSession(s: DuoSessionRecord) {
 const ttl = Math.max(1, Math.ceil((s.expiresAt - Date.now()) / 1000));
 await putRecord('duo:' + s.id, s, ttl); await putRecord('token:' + s.partner1Token, s.id, ttl); await putRecord('token:' + s.partner2Token, s.id, ttl);
}
export async function getDuoSessionById(id: string) {
 const s = await getRecord<DuoSessionRecord>('duo:' + id); if (s && Date.now() >= s.expiresAt) s.status = 'expired'; return s;
}
export async function getDuoSessionByToken(token: string) {
 const id = await getRecord<string>('token:' + token), session = id ? await getDuoSessionById(id) : null;
 if (!session || ![session.partner1Token, session.partner2Token].includes(token)) return null;
 return { session, role: token === session.partner1Token ? 'partner1' as const : 'partner2' as const };
}
export const saveEntitlement = (e: EntitlementRecord) => putRecord('entitlement:' + e.id, e);
export const getEntitlement = (id: string) => getRecord<EntitlementRecord>('entitlement:' + id);
export async function saveSolo(s: SoloRecord) {
 const ttl = Math.max(1, Math.ceil((s.expiresAt - Date.now()) / 1000));
 await putRecord('solo:' + s.id, s, ttl); await putRecord('solo-token:' + s.token, s.id, ttl);
}
export async function getSolo(token: string) {
 const id = await getRecord<string>('solo-token:' + token), s = id ? await getRecord<SoloRecord>('solo:' + id) : null;
 return s && s.expiresAt > Date.now() && s.token === token ? s : null;
}
