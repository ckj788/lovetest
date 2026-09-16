'use client';

import React, { useState, useEffect } from 'react';
import posthog from 'posthog-js';
import { Header } from '../components/Header';
import { QuizLanding } from '../components/QuizLanding';
import { QuizQuestion } from '../components/QuizQuestion';
import { QuizCalculating } from '../components/QuizCalculating';
import { QuizResult } from '../components/QuizResult';
import { QUIZ_QUESTIONS, ARCHETYPES } from '../data/questions';
import { calculateQuizResult } from '../utils/calculator';
import { QuizResultData } from '../types/quiz';

export default function Home() {
  const [step, setStep] = useState<'landing' | 'quiz' | 'calculating' | 'result'>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string | string[]>>({});
  const [result, setResult] = useState<QuizResultData | null>(null);
  const [initialUnlocked, setInitialUnlocked] = useState(false);

  // Restore state if returning from Stripe Checkout (e.g. ?unlocked=true) or dev preview (?preview=archetype_id)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const isUnlockedParam = params.get('unlocked') === 'true';
      const sessionId = params.get('session_id');
      const previewParam = params.get('preview');

      if (previewParam) {
        const mockArch = ARCHETYPES.find((a) => a.id === previewParam);
        if (mockArch) {
          const mockAnswersByArchetype: Record<string, Record<number, string | string[]>> = {
            situationship: { 1: 'q1_a', 2: 'q2_b', 3: 'q3_b', 4: 'q4_b', 5: ['q5_1', 'q5_2'], 6: 'q6_c', 7: 'q7_b', 8: 'q8_c' },
            chemistry_trap: { 1: 'q1_a', 2: 'q2_d', 3: 'q3_b', 4: 'q4_c', 5: ['q5_1'], 6: 'q6_c', 7: 'q7_c', 8: 'q8_b' },
            slow_burner: { 1: 'q1_b', 2: 'q2_c', 3: 'q3_a', 4: 'q4_a', 5: ['q5_1', 'q5_4'], 6: 'q6_b', 7: 'q7_b', 8: 'q8_c' },
            breadcrumber: { 1: 'q1_c', 2: 'q2_d', 3: 'q3_c', 4: 'q4_c', 5: ['q5_6'], 6: 'q6_c', 7: 'q7_d', 8: 'q8_d' },
            quietly_serious: { 1: 'q1_a', 2: 'q2_a', 3: 'q3_a', 4: 'q4_a', 5: ['q5_1', 'q5_2', 'q5_3', 'q5_4', 'q5_5'], 6: 'q6_a', 7: 'q7_a', 8: 'q8_a' },
          };

          const answers = mockAnswersByArchetype[previewParam] || mockAnswersByArchetype.situationship;
          const calculated = calculateQuizResult(answers);
          const mockResult: QuizResultData = {
            ...calculated,
            archetype: mockArch,
          };
          setResult(mockResult);
          setStep('result');
          if (isUnlockedParam) {
            setInitialUnlocked(true);
          }
          return;
        }
      }

      const savedResult = localStorage.getItem('mixedsigns_quiz_result');
      if (savedResult) {
        try {
          const parsed = JSON.parse(savedResult);
          if (parsed && parsed.archetype) {
            setResult(parsed);
            if (isUnlockedParam || sessionId) {
              setStep('result');
              setInitialUnlocked(true);
              posthog.capture('payment_success', {
                archetype: parsed.archetype.name,
                total_score: parsed.totalScore,
              });
              window.history.replaceState({}, document.title, window.location.pathname);
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleStart = () => {
    posthog.capture('quiz_start');
    setStep('quiz');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setResult(null);
    setInitialUnlocked(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mixedsigns_quiz_result');
    }
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
          posthog.capture('quiz_completed', {
            archetype: computedResult.archetype.name,
            total_score: computedResult.totalScore,
          });
          if (typeof window !== 'undefined') {
            localStorage.setItem('mixedsigns_quiz_result', JSON.stringify(computedResult));
          }
          fetch('/api/stats', { method: 'POST' }).catch(() => {});
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
    if (currentQuestion.type === 'multi') {
      posthog.capture('quiz_multi_confirmed', {
        question_id: currentQuestion.id,
        question_index: currentQuestionIndex + 1,
      });
    }

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const computedResult = calculateQuizResult(userAnswers);
      setResult(computedResult);
      posthog.capture('quiz_completed', {
        archetype: computedResult.archetype.name,
        total_score: computedResult.totalScore,
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('mixedsigns_quiz_result', JSON.stringify(computedResult));
      }
      fetch('/api/stats', { method: 'POST' }).catch(() => {});
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
    setInitialUnlocked(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mixedsigns_quiz_result');
    }
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
          <QuizResult
            result={result}
            onReset={handleReset}
            initialUnlocked={initialUnlocked}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-palette-slate/10 text-center text-xs font-semibold text-palette-slate/60">
        <p>© 2026 mixedsigns · Relationship Signal Engine</p>
      </footer>
    </div>
  );
}
