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
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="glass-card rounded-3xl p-6 md:p-8 shadow-mbti border border-white/90"
        >
          {/* Top Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-mbti-purple/10 text-mbti-purple">
              QUESTION {currentIndex + 1} OF {totalQuestions}
            </span>
            {isMulti && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-mbti-yellow/15 text-amber-700">
                Select All That Apply
              </span>
            )}
          </div>

          {/* Question Title */}
          <h2 className="text-xl md:text-2xl font-extrabold text-mbti-text leading-snug mb-2">
            {question.title}
          </h2>

          {question.subtitle && (
            <p className="text-xs md:text-sm text-mbti-muted mb-6">
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
                      ? 'bg-gradient-to-r from-mbti-pink/10 to-mbti-purple/10 border-mbti-purple shadow-md ring-2 ring-mbti-purple/20'
                      : 'bg-white/80 hover:bg-white border-mbti-border hover:border-mbti-purple/40 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3.5 pr-2">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        selected
                          ? 'bg-mbti-purple text-white'
                          : 'bg-mbti-purple/10 text-mbti-purple'
                      }`}
                    >
                      {optionLetters[idx] || idx + 1}
                    </div>
                    <span className={`text-sm md:text-base font-medium leading-relaxed ${selected ? 'text-mbti-purple font-semibold' : 'text-mbti-text'}`}>
                      {option.label}
                    </span>
                  </div>

                  <div className="shrink-0 ml-2">
                    {selected ? (
                      <CheckCircle2 className="w-5 h-5 text-mbti-purple" />
                    ) : (
                      <Circle className="w-5 h-5 text-mbti-muted/40" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-mbti-border/60">
            <button
              onClick={onPrev}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed text-mbti-muted'
                  : 'text-mbti-text hover:bg-mbti-purple/10'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              onClick={onNext}
              disabled={!canProceed}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-sm transition-all ${
                canProceed
                  ? 'bg-gradient-mbti text-white hover:opacity-95 shadow-glow-purple cursor-pointer'
                  : 'bg-mbti-border/70 text-mbti-muted opacity-60 cursor-not-allowed'
              }`}
            >
              <span>{currentIndex === totalQuestions - 1 ? 'Generate Analysis' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
