'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Compass, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

interface QuizCalculatingProps {
  onComplete: () => void;
}

export const QuizCalculating: React.FC<QuizCalculatingProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    { label: 'Analyzing Subconscious Chemistry (Raw Attraction)', icon: Heart, badgeColor: 'bg-palette-lilac text-palette-slate' },
    { label: 'Measuring Real Effort & Availability (Real Effort)', icon: Activity, badgeColor: 'bg-palette-slate text-white' },
    { label: 'Calculating DTR Willingness (Commitment)', icon: Compass, badgeColor: 'bg-palette-sage text-white' },
    { label: 'Fitting Roster & Boundary Model (Exclusivity)', icon: Lock, badgeColor: 'bg-palette-sand text-palette-slate' },
    { label: 'Generating Persona & 7-Day Power Playbook...', icon: Sparkles, badgeColor: 'bg-palette-coral text-white' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 25) setStepIndex(0);
    else if (progress < 50) setStepIndex(1);
    else if (progress < 75) setStepIndex(2);
    else if (progress < 95) setStepIndex(3);
    else setStepIndex(4);
  }, [progress]);

  const CurrentIcon = steps[stepIndex].icon;

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="soft-card p-8 md:p-12 bg-palette-white relative overflow-hidden"
      >
        {/* Animated Circle Icon */}
        <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-palette-coral/20 animate-ping" />
          <div className="relative w-20 h-20 rounded-3xl bg-palette-coral text-white flex items-center justify-center shadow-soft-coral">
            <CurrentIcon className="w-9 h-9 animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-palette-slate mb-2">
          Cosmic Algorithm Processing...
        </h2>
        <p className="text-xs md:text-sm text-palette-slate/70 mb-8 font-medium">
          Cross-referencing 8 behavioral proofs against 20+ red & green flag indicators
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-palette-slate/10 h-3 rounded-full overflow-hidden p-0.5 mb-6">
          <div
            className="h-full bg-palette-coral rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic Status Steps */}
        <div className="space-y-2.5 text-left max-w-md mx-auto">
          {steps.map((s, idx) => {
            const isFinished = stepIndex > idx;
            const isCurrent = stepIndex === idx;
            const StepIcon = s.icon;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs md:text-sm transition-all border ${
                  isCurrent
                    ? 'bg-palette-slate text-white border-palette-slate font-bold shadow-sm'
                    : isFinished
                    ? 'bg-palette-cream/40 text-palette-slate/60 border-palette-slate/10'
                    : 'bg-palette-cream/20 text-palette-slate/30 border-palette-slate/5'
                }`}
              >
                {isFinished ? (
                  <CheckCircle2 className="w-4 h-4 text-palette-sage shrink-0" />
                ) : (
                  <StepIcon className={`w-4 h-4 shrink-0 ${isCurrent ? 'animate-spin text-palette-sand' : 'text-palette-slate/40'}`} />
                )}
                <span className="truncate">{s.label}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
