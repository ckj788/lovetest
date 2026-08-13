'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../types/quiz';

interface QuizQuestionProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswers: string | string[];
  onSelectOption: (optionId: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswers,
  onSelectOption,
  onNext,
  onPrev,
}) => {
  const isMulti = question.type === 'multi';

  const isOptionSelected = (optId: string) => {
    if (isMulti && Array.isArray(selectedAnswers)) {
      return selectedAnswers.includes(optId);
    }
    return selectedAnswers === optId;
  };

  const canProceed = isMulti
    ? Array.isArray(selectedAnswers) && selectedAnswers.length > 0
    : Boolean(selectedAnswers);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="costar-box p-6 md:p-8 corner-ticks"
        >
          {/* Top Monospace Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800 font-mono text-xs">
            <span className="text-white tracking-widest">
              [ QUESTION {String(currentIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')} ]
            </span>
            {isMulti && (
              <span className="text-zinc-400 border border-zinc-700 px-2 py-0.5 uppercase tracking-wider text-[10px]">
                SELECT ALL THAT APPLY
              </span>
            )}
          </div>

          {/* Question Title */}
          <h2 className="text-lg md:text-2xl font-bold text-white leading-snug mb-2 font-sans">
            {question.title}
          </h2>

          {question.subtitle && (
            <p className="font-mono text-xs text-zinc-400 mb-8">
              // {question.subtitle}
            </p>
          )}

          {/* Options List */}
          <div className="space-y-3 mb-8">
            {question.options.map((option, idx) => {
              const selected = isOptionSelected(option.id);
              const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

              return (
                <motion.div
                  key={option.id}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onSelectOption(option.id)}
                  className={`cursor-pointer p-4 transition-all border flex items-center justify-between font-mono text-xs md:text-sm ${
                    selected
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-500 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5 pr-2">
                    <span className={`px-2 py-0.5 text-xs font-mono border ${selected ? 'border-black text-black bg-white' : 'border-zinc-700 text-zinc-400 bg-black'}`}>
                      {optionLetters[idx] || idx + 1}
                    </span>
                    <span className="leading-relaxed">
                      {option.label}
                    </span>
                  </div>

                  <div className="shrink-0 ml-2">
                    {selected ? '[ ✓ ]' : '[   ]'}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-zinc-800 font-mono text-xs">
            <button
              onClick={onPrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2.5 border uppercase tracking-widest transition-all ${
                currentIndex === 0
                  ? 'border-zinc-900 text-zinc-700 cursor-not-allowed'
                  : 'border-zinc-700 text-zinc-300 hover:border-white hover:text-white'
              }`}
            >
              ← PREVIOUS
            </button>

            <button
              onClick={onNext}
              disabled={!canProceed}
              className={`px-6 py-2.5 uppercase tracking-widest font-bold border transition-all ${
                canProceed
                  ? 'bg-white text-black border-white hover:bg-zinc-200 cursor-pointer'
                  : 'bg-zinc-900 text-zinc-600 border-zinc-800 cursor-not-allowed'
              }`}
            >
              <span>{currentIndex === totalQuestions - 1 ? 'GENERATE DIAGNOSIS →' : 'NEXT QUESTION →'}</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
