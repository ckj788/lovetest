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
    <header className="sticky top-0 z-40 w-full bg-[#FDF8E2]/95 backdrop-blur-md border-b border-palette-slate/10 py-2.5 sm:py-3 px-3 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Logo & Brand */}
        <div 
          onClick={onReset}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-palette-slate text-palette-cream flex items-center justify-center font-bold text-base sm:text-lg shadow-sm group-hover:scale-105 transition-transform shrink-0">
            ✿
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-black text-lg sm:text-xl text-palette-slate tracking-tight lowercase">
              mixedsigns
            </span>
            <span className="hidden sm:inline-block text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-palette-lilac/50 text-palette-slate border border-palette-slate/15">
              Signal Engine
            </span>
          </div>
        </div>

        {/* Dynamic Right Section */}
        {currentStep === 'quiz' && (
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="text-right">
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-palette-slate/60">Progress</p>
              <p className="text-xs sm:text-sm font-extrabold text-palette-slate">
                {currentQuestionIndex + 1} <span className="text-palette-slate/50 font-normal">/ {totalQuestions}</span>
              </p>
            </div>

            {/* Smooth Soft Progress Bar */}
            <div className="w-14 sm:w-28 h-2 bg-palette-slate/10 rounded-full overflow-hidden p-0.5">
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
            className="flex items-center gap-1.5 text-xs font-bold text-palette-slate hover:bg-palette-lilac/40 bg-palette-white border border-palette-slate/15 px-3 py-1.5 rounded-2xl shadow-xs transition-all cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake</span>
          </button>
        )}

        {currentStep === 'landing' && (
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-palette-slate bg-palette-white border border-palette-slate/15 px-2.5 sm:px-3 py-1 rounded-full shadow-xs shrink-0">
            <span className="text-palette-coral">✿</span>
            <span className="hidden sm:inline">20+ Behavioral Signals</span>
            <span className="sm:hidden">8 Qs · 60s</span>
          </div>
        )}
      </div>
    </header>
  );
};
