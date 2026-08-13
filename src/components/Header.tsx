'use client';

import React from 'react';

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
    <header className="sticky top-0 z-40 w-full bg-costar-black/95 backdrop-blur-md border-b border-costar-border py-3 px-4 md:px-8">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo & Brand */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-7 h-7 border border-white flex items-center justify-center font-mono text-xs text-white group-hover:bg-white group-hover:text-black transition-colors">
            ☉
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm tracking-[0.2em] uppercase text-white">
                CO-STAR
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 border border-zinc-700 text-zinc-400">
                SIGNAL ENGINE
              </span>
            </div>
            <p className="text-[11px] font-mono text-zinc-500 hidden sm:block">DECODING UNSPOKEN INTENT</p>
          </div>
        </div>

        {/* Dynamic Right Section */}
        {currentStep === 'quiz' && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">PROGRESS</p>
              <p className="text-xs font-mono font-bold text-white">
                {String(currentQuestionIndex + 1).padStart(2, '0')} <span className="text-zinc-600 font-normal">/ {String(totalQuestions).padStart(2, '0')}</span>
              </p>
            </div>

            {/* 1px Sharp Progress Line */}
            <div className="w-20 sm:w-28 h-1 bg-zinc-800 p-0">
              <div
                className="h-full bg-white transition-all duration-300 ease-out"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        )}

        {currentStep === 'result' && onReset && (
          <button
            onClick={onReset}
            className="text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white border border-zinc-700 hover:border-white px-3 py-1.5 transition-all"
          >
            [ RETAKE DIAGNOSIS ]
          </button>
        )}

        {currentStep === 'landing' && (
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 border border-zinc-800 px-2.5 py-1">
            <span className="text-white">✦</span>
            <span>VERIFIED ASTROLOGICAL BEHAVIOR MODEL</span>
          </div>
        )}
      </div>
    </header>
  );
};
