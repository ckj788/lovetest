'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../types/quiz';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from 'lucide-react';

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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="soft-card p-6 md:p-8 bg-palette-white relative"
        >
          {/* Top Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-palette-lilac/40 text-palette-slate border border-palette-slate/10">
              QUESTION {currentIndex + 1} OF {totalQuestions}
            </span>
            {isMulti && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-palette-sand text-palette-slate">
                Select All That Apply
              </span>
            )}
          </div>

          {/* Question Title */}
          <h2 className="text-xl md:text-2xl font-black text-palette-slate leading-snug mb-1">
            {question.title}
          </h2>

          {question.subtitle && (
            <p className="text-xs md:text-sm text-palette-slate/60 font-medium mb-6">
              {question.subtitle}
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
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onSelectOption(option.id)}
                  className={`relative cursor-pointer rounded-2xl p-4 transition-all border flex items-center justify-between ${
                    selected
                      ? 'bg-palette-slate text-white border-palette-slate shadow-md'
                      : 'bg-palette-cream/50 hover:bg-palette-cream border-palette-slate/15 text-palette-slate shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3.5 pr-2">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        selected
                          ? 'bg-palette-coral text-white'
                          : 'bg-palette-slate/10 text-palette-slate'
                      }`}
                    >
                      {optionLetters[idx] || idx + 1}
                    </div>
                    <span className={`text-xs md:text-sm font-semibold leading-relaxed ${selected ? 'text-white font-bold' : 'text-palette-slate'}`}>
                      {option.label}
                    </span>
                  </div>

                  <div className="shrink-0 ml-2">
                    {selected ? (
                      <CheckCircle2 className="w-5 h-5 text-palette-coral" />
                    ) : (
                      <Circle className="w-5 h-5 text-palette-slate/30" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-palette-slate/10">
            <button
              onClick={onPrev}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                currentIndex === 0
                  ? 'opacity-30 cursor-not-allowed text-palette-slate'
                  : 'text-palette-slate hover:bg-palette-lilac/30 border border-palette-slate/15'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={onNext}
              disabled={!canProceed}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs md:text-sm font-extrabold shadow-sm transition-all cursor-pointer ${
                canProceed
                  ? 'bg-palette-coral text-white hover:opacity-95 shadow-soft-coral border border-palette-coral'
                  : 'bg-palette-slate/15 text-palette-slate/40 opacity-50 cursor-not-allowed'
              }`}
            >
              <span>{currentIndex === totalQuestions - 1 ? 'Generate Analysis' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
