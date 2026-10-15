'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { DualLanding } from '../../components/dual/DualLanding';
import { DualQuestionView } from '../../components/dual/DualQuestionView';
import { DualInviteScreen } from '../../components/dual/DualInviteScreen';
import { DualResultView } from '../../components/dual/DualResultView';
import { DualMode, DualResultData } from '../../types/dual';
import {
  TALKING_STAGE_QUESTIONS,
  COUPLES_QUESTIONS,
  MOCK_PARTNER_RESPONSES,
  calculateDualResult,
} from '../../data/dualQuestions';
import { Sparkles, ArrowLeft, HeartHandshake } from 'lucide-react';

export default function DualPage() {
  const [step, setStep] = useState<'landing' | 'quiz' | 'invite' | 'result'>('landing');
  const [selectedMode, setSelectedMode] = useState<DualMode>('talking_stage');
  const [partnerRole, setPartnerRole] = useState<'partner1' | 'partner2'>('partner1');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [p1Answers, setP1Answers] = useState<Record<number, string>>({});
  const [p2Answers, setP2Answers] = useState<Record<number, string>>({});
  const [dualResult, setDualResult] = useState<DualResultData | null>(null);
  const [initialUnlocked, setInitialUnlocked] = useState(false);

  // Check URL query parameters for dev preview or partner invite links
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const modeParam = params.get('mode') as DualMode | null;
      const partnerParam = params.get('partner');
      const previewParam = params.get('preview');

      const activeMode = modeParam === 'couples' ? 'couples' : 'talking_stage';
      if (modeParam) {
        setSelectedMode(activeMode);
      }

      if (previewParam === 'unlocked' || previewParam === 'teaser') {
        const mockP1 = activeMode === 'talking_stage'
          ? { 1: 'ts_q1_a', 2: 'ts_q2_a', 3: 'ts_q3_b', 4: 'ts_q4_a', 5: 'ts_q5_a', 6: 'ts_q6_a' }
          : { 1: 'cp_q1_a', 2: 'cp_q2_c', 3: 'cp_q3_a', 4: 'cp_q4_b', 5: 'cp_q5_a', 6: 'cp_q6_a' };
        const mockP2 = MOCK_PARTNER_RESPONSES[activeMode];
        const res = calculateDualResult(activeMode, mockP1, mockP2);
        setP1Answers(mockP1);
        setP2Answers(mockP2);
        setDualResult(res);
        setStep('result');
        if (previewParam === 'unlocked') {
          setInitialUnlocked(true);
        }
        return;
      }

      if (partnerParam === '2') {
        setPartnerRole('partner2');
        setStep('quiz');
      }
    }
  }, []);

  const questions = selectedMode === 'talking_stage' ? TALKING_STAGE_QUESTIONS : COUPLES_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswers = partnerRole === 'partner1' ? p1Answers : p2Answers;

  const handleSelectOption = (optionId: string) => {
    if (partnerRole === 'partner1') {
      setP1Answers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
    } else {
      setP2Answers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Completed all questions for this partner
      if (partnerRole === 'partner1') {
        setStep('invite');
      } else {
        // Partner 2 finished -> calculate result
        const res = calculateDualResult(selectedMode, p1Answers, p2Answers);
        setDualResult(res);
        setStep('result');
      }
    }
  };

  const handleSimulatePartner2 = () => {
    // Generate realistic Partner 2 answers and immediately show matched result
    const simulatedP2 = MOCK_PARTNER_RESPONSES[selectedMode];
    setP2Answers(simulatedP2);
    const res = calculateDualResult(selectedMode, p1Answers, simulatedP2);
    setDualResult(res);
    setStep('result');
  };

  const handleAnswerAsPartner2 = () => {
    setPartnerRole('partner2');
    setCurrentQuestionIndex(0);
    setStep('quiz');
  };

  const handleReset = () => {
    setStep('landing');
    setCurrentQuestionIndex(0);
    setP1Answers({});
    setP2Answers({});
    setPartnerRole('partner1');
    setDualResult(null);
    setInitialUnlocked(false);
  };

  return (
    <div className="min-h-screen bg-[#FDF8E2] text-palette-slate">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full bg-[#FDF8E2]/95 backdrop-blur-md border-b border-palette-slate/10 py-2.5 sm:py-3 px-3 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          {/* Logo & Mode Pill */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="flex items-center gap-2 group select-none shrink-0"
            >
              <div className="w-8 h-8 rounded-2xl bg-palette-slate text-palette-cream flex items-center justify-center font-bold text-base shadow-sm group-hover:scale-105 transition-transform shrink-0">
                ✿
              </div>
              <span className="font-black text-lg text-palette-slate tracking-tight lowercase">
                mixedsigns
              </span>
            </Link>

            <span className="text-[10px] sm:text-[11px] font-black px-2.5 py-0.5 rounded-full bg-palette-sand text-palette-slate border border-palette-slate/15 flex items-center gap-1">
              <HeartHandshake className="w-3 h-3 text-palette-coral" />
              <span>Duo Blind Match</span>
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-[11px] sm:text-xs font-bold text-palette-slate/75 hover:text-palette-slate transition-colors px-2.5 py-1 rounded-xl hover:bg-palette-lilac/30"
            >
              Switch to Solo Test →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pb-16">
        {step === 'landing' && (
          <DualLanding
            selectedMode={selectedMode}
            onSelectMode={(m) => setSelectedMode(m)}
            onStart={() => {
              setCurrentQuestionIndex(0);
              setStep('quiz');
            }}
          />
        )}

        {step === 'quiz' && currentQuestion && (
          <DualQuestionView
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            partnerRole={partnerRole}
            selectedOptionId={currentAnswers[currentQuestion.id]}
            onSelectOption={handleSelectOption}
            onNext={handleNextQuestion}
          />
        )}

        {step === 'invite' && (
          <DualInviteScreen
            mode={selectedMode}
            onSimulatePartner2={handleSimulatePartner2}
            onAnswerAsPartner2={handleAnswerAsPartner2}
          />
        )}

        {step === 'result' && dualResult && (
          <DualResultView
            result={dualResult}
            initialUnlocked={initialUnlocked}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-palette-slate/60 border-t border-palette-slate/10">
        © 2026 mixedsigns · Relationship Signal Engine · Dual Blind Alignment Instrument
      </footer>
    </div>
  );
}
