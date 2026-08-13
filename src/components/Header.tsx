'use client';

import React from 'react';
import { RotateCcw } from 'lucide-react';

interface HeaderProps {
  currentStep: 'landing' | 'quiz' | 'calculating' | 'result';
  currentQuestionIndex?: number;
  totalQuestions?: number;
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  currentQuestionIndex = 0,
  totalQuestions = 8,
  onReset,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDF8E2]/95 backdrop-blur-md border-b border-palette-slate/10 py-3.5 px-4 md:px-8">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo & Brand */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-2xl bg-palette-slate text-palette-cream flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            ✿
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base md:text-lg text-palette-slate tracking-tight">
                SignalQuiz
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-palette-lilac/50 text-palette-slate border border-palette-slate/15">
                Co-Star Engine
              </span>
            </div>
            <p className="text-xs text-palette-slate/70 hidden sm:block">Decoding his unspoken intent.</p>
          </div>
        </div>

        {/* Dynamic Right Section */}
        {currentStep === 'quiz' && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-palette-slate/60">Progress</p>
              <p className="text-xs md:text-sm font-extrabold text-palette-slate">
                {currentQuestionIndex + 1} <span className="text-palette-slate/50 font-normal">/ {totalQuestions}</span>
              </p>
            </div>

            {/* Smooth Soft Progress Bar */}
            <div className="w-20 sm:w-28 h-2 bg-palette-slate/10 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-palette-coral rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        )}

        {currentStep === 'result' && onReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-bold text-palette-slate hover:bg-palette-lilac/40 bg-palette-white border border-palette-slate/15 px-3.5 py-1.5 rounded-2xl shadow-xs transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Quiz</span>
          </button>
        )}

        {currentStep === 'landing' && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-palette-slate bg-palette-white border border-palette-slate/15 px-3 py-1.5 rounded-full shadow-xs">
            <span className="text-palette-coral">✿</span>
            <span>20+ Behavioral Signals</span>
          </div>
        )}
      </div>
    </header>
  );
};
