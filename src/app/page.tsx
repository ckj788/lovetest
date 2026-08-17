'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { QuizLanding } from '../components/QuizLanding';
import { QuizQuestion } from '../components/QuizQuestion';
import { QuizCalculating } from '../components/QuizCalculating';
import { QuizResult } from '../components/QuizResult';
import { QUIZ_QUESTIONS } from '../data/questions';
import { calculateQuizResult } from '../utils/calculator';
import { QuizResultData } from '../types/quiz';

export default function Home() {
  const [step, setStep] = useState<'landing' | 'quiz' | 'calculating' | 'result'>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string | string[]>>({});
  const [result, setResult] = useState<QuizResultData | null>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleStart = () => {
    setStep('quiz');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setResult(null);
  };

  const handleSelectOption = (optionId: string) => {
    const isMulti = currentQuestion.type === 'multi';

    if (!isMulti) {
      const updatedAnswers = { ...userAnswers, [currentQuestion.id]: optionId };
      setUserAnswers(updatedAnswers);

      // Auto-advance directly on click with 160ms visual feedback
      setTimeout(() => {
        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          const computedResult = calculateQuizResult(updatedAnswers);
          setResult(computedResult);
          setStep('calculating');
        }
      }, 160);
    } else {
      setUserAnswers((prev) => {
        const currentArr = (prev[currentQuestion.id] as string[]) || [];
        if (currentArr.includes(optionId)) {
          const filtered = currentArr.filter((id) => id !== optionId);
          return { ...prev, [currentQuestion.id]: filtered };
        } else {
          if (optionId === 'q5_6') {
            return { ...prev, [currentQuestion.id]: [optionId] };
          } else {
            const noNone = currentArr.filter((id) => id !== 'q5_6');
            return { ...prev, [currentQuestion.id]: [...noNone, optionId] };
          }
        }
      });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const computedResult = calculateQuizResult(userAnswers);
      setResult(computedResult);
      setStep('calculating');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleCalculationComplete = () => {
    setStep('result');
  };

  const handleReset = () => {
    setStep('landing');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-palette-cream text-palette-slate flex flex-col font-sans selection:bg-palette-lilac">
      <Header
        currentStep={step}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={QUIZ_QUESTIONS.length}
        onReset={handleReset}
      />

      <main className="flex-1">
        {step === 'landing' && <QuizLanding onStart={handleStart} />}

        {step === 'quiz' && currentQuestion && (
          <QuizQuestion
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={QUIZ_QUESTIONS.length}
            selectedAnswers={userAnswers[currentQuestion.id] || (currentQuestion.type === 'multi' ? [] : '')}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}

        {step === 'calculating' && (
          <QuizCalculating onComplete={handleCalculationComplete} />
        )}

        {step === 'result' && result && (
          <QuizResult result={result} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-palette-slate/10 text-center text-xs font-semibold text-palette-slate/60">
        <p>© 2026 SignalQuiz PRO · Co-Star AI Relationship Engine</p>
      </footer>
    </div>
  );
}
