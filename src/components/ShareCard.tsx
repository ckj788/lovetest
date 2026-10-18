'use client';
import { QuizResultData } from '../types/quiz';
import { SafeShareCard } from './ui/SafeShareCard';
export function ShareCard({ result }: {
    result: QuizResultData;
}) { return <SafeShareCard title={result.pattern.name} symbol={result.pattern.emoji} mode="solo" caption="A pattern, not a prediction." path="/"/>; }
