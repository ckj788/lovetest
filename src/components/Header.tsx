'use client';

import React from 'react';
import { Sparkles, HeartHandshake, RotateCcw } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full glass-card border-b border-mbti-border/60 py-3.5 px-4 md:px-8 transition-all">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo & Brand */}
        <div 
          onClick={onReset}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-mbti flex items-center justify-center text-white shadow-mbti group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-mbti-text tracking-tight">SignalQuiz</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-mbti-purple/10 text-mbti-purple border border-mbti-purple/20">
                PRO 行为分析
              </span>
            </div>
            <p className="text-xs text-mbti-muted hidden sm:block">测懂他未说出口的关系信号</p>
          </div>
        </div>

        {/* Dynamic Right Section */}
        {currentStep === 'quiz' && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden xs:block">
              <p className="text-xs font-semibold text-mbti-muted">测评进度</p>
              <p className="text-sm font-bold text-mbti-purple">
                {currentQuestionIndex + 1} <span className="text-mbti-muted font-normal">/ {totalQuestions}</span>
              </p>
            </div>

            {/* Mini Progress Bar */}
            <div className="w-24 sm:w-32 h-2.5 bg-mbti-purple/15 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-mbti rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        )}

        {currentStep === 'result' && onReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-mbti-muted hover:text-mbti-purple bg-mbti-purple/5 hover:bg-mbti-purple/10 border border-mbti-purple/20 px-3 py-1.5 rounded-lg transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            重新测试
          </button>
        )}

        {currentStep === 'landing' && (
          <div className="flex items-center gap-2 text-xs text-mbti-muted bg-white/60 border border-mbti-border px-3 py-1.5 rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-mbti-yellow animate-pulse" />
            <span>基于 20+ 行为信号深度匹配</span>
          </div>
        )}
      </div>
    </header>
  );
};
