'use client';
import {QuizResultData} from '../types/quiz';
import {PremiumSoloReport} from './report/PremiumSoloReport';
export function QuizResult({result,onReset}:{result:QuizResultData;onReset:()=>void;initialUnlocked?:boolean}){return <PremiumSoloReport result={result} onReset={onReset}/>;}
