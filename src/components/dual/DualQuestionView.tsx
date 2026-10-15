'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DualQuestion } from '../../types/dual';
import { Lock, ArrowRight } from 'lucide-react';

interface DualQuestionViewProps {
  question: DualQuestion;
  currentIndex: number;
  totalQuestions: number;
  partnerRole: 'partner1' | 'partner2';
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
  onNext: () => void;
}

export const DualQuestionView: React.FC<DualQuestionViewProps> = ({
  question,
  currentIndex,
  totalQuestions,
  partnerRole,
  selectedOptionId,
  onSelectOption,
  onNext,
}) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 sm:py-10">
      {/* Top Meta info */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-palette-slate text-palette-sand text-[11px] font-black">
          <Lock className="w-3 h-3 text-palette-coral" />
          <span>{partnerRole === 'partner1' ? 'Partner 1' : 'Partner 2'} · Sealed Answer</span>
        </div>

        <span className="text-xs font-black text-palette-slate/70">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-palette-slate/10 rounded-full overflow-hidden p-0.5 mb-6">
        <div
          className="h-full bg-palette-coral rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Question Category */}
          <span className="inline-block text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-palette-coral bg-palette-coral/10 px-2.5 py-0.5 rounded-full mb-2">
            {question.category}
          </span>

          <h2 className="text-xl sm:text-2xl font-black text-palette-slate leading-snug mb-2">
            {question.title}
          </h2>

          <p className="text-xs sm:text-sm text-palette-slate/70 font-medium mb-6">
            {question.subtitle}
          </p>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((opt, oIdx) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => onSelectOption(opt.id)}
                  className={`cursor-pointer rounded-2xl p-4 sm:p-5 transition-all border-2 select-none flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-palette-white border-palette-slate shadow-soft-flat ring-2 ring-palette-coral/40'
                      : 'bg-palette-white/70 border-palette-slate/15 hover:border-palette-slate/30'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center shrink-0 font-black text-xs mt-0.5 ${
                    isSelected
                      ? 'border-palette-slate bg-palette-slate text-palette-sand'
                      : 'border-palette-slate/25 text-palette-slate/50'
                  }`}>
                    {String.fromCharCode(65 + oIdx)}
                  </div>

                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-bold text-palette-slate leading-relaxed">
                      {opt.label}
                    </p>
                    {opt.tag && (
                      <span className="inline-block mt-2 text-[10px] font-extrabold px-2 py-0.5 rounded bg-palette-cream text-palette-slate/70 border border-palette-slate/10">
                        {opt.tag}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action button */}
          <div className="text-center">
            <button
              disabled={!selectedOptionId}
              onClick={onNext}
              className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-sm sm:text-base shadow-soft-flat transition-all cursor-pointer inline-flex items-center justify-center gap-2 ${
                selectedOptionId
                  ? 'bg-palette-slate text-white hover:bg-palette-slate/90 active:scale-98'
                  : 'bg-palette-slate/20 text-palette-slate/40 cursor-not-allowed'
              }`}
            >
              <span>{currentIndex === totalQuestions - 1 ? 'Seal My Answers' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
