import {calculateQuizResult} from '../utils/calculator';
import {analyzeSoloResult} from '../data/soloAnalysis';
import type {Answers} from './reports';
// The requested demo is available until real payment is configured. Explicit false disables it.
export function soloDemoEnabled(){if(process.env.REPORT_PREVIEW_MODE==='false')return false;return process.env.REPORT_PREVIEW_MODE==='true'||process.env.NODE_ENV==='development'||!(process.env.STRIPE_SECRET_KEY&&process.env.STRIPE_WEBHOOK_SECRET);}
export function soloBrowserReport(answers:Answers,requestUnlock=false){const result=calculateQuizResult(answers);const analysis=analyzeSoloResult(result);const unlocked=requestUnlock&&soloDemoEnabled();return {browserOnly:true,storage:'browser' as const,mode:'solo' as const,role:'owner' as const,completed:true,paid:false,unlocked,previewUnlocked:unlocked,previewMode:soloDemoEnabled(),price:799,expiresAt:Date.now()+30*86400000,preview:{name:result.pattern.name,emoji:result.pattern.emoji,summary:analysis.headline,action:analysis.previewAction},full:unlocked?result:undefined};}
