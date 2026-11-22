import {calculateQuizResult} from '../utils/calculator';
import {analyzeSoloResult} from '../data/soloAnalysis';
import type {Answers} from './reports';
// Missing production storage or Stripe configuration must not grant full access.
export function soloDemoEnabled(){return process.env.NODE_ENV==='development'&&process.env.REPORT_PREVIEW_MODE!=='false';}
export function soloBrowserReport(answers:Answers,requestUnlock=false){const result=calculateQuizResult(answers);const analysis=analyzeSoloResult(result);const unlocked=requestUnlock&&soloDemoEnabled();return {browserOnly:true,storage:'browser' as const,mode:'solo' as const,role:'owner' as const,completed:true,paid:false,unlocked,previewUnlocked:unlocked,previewMode:soloDemoEnabled(),price:799,expiresAt:Date.now()+30*86400000,preview:{name:result.pattern.name,emoji:result.pattern.emoji,summary:analysis.headline,action:analysis.previewAction},full:unlocked?result:undefined};}
