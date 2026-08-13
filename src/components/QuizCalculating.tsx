'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CelestialArt } from './CelestialArt';

interface QuizCalculatingProps {
  onComplete: () => void;
}

export const QuizCalculating: React.FC<QuizCalculatingProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    'ALIGNING CELESTIAL VECTORS (ATTRACTION SPARK)',
    'MEASURING REAL EFFORT & AVAILABILITY DENSITY',
    'CALCULATING DTR WILLINGNESS & STATUS INTENT',
    'COMPUTING ROSTER & SOCIAL BOUNDARY MATRIX',
    'GENERATING ASTROLOGICAL PERSONA & 7-DAY PLAYBOOK',
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

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="costar-box p-8 md:p-12 corner-ticks"
      >
        {/* Celestial Line Art Animation */}
        <div className="relative w-36 h-36 mx-auto mb-8 flex items-center justify-center">
          <CelestialArt size={140} />
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-widest">
          CO-STAR ALGORITHM PROCESSING
        </h2>
        <p className="text-xs text-zinc-400 mb-8">
          // CROSS-REFERENCING 8 PROOFS AGAINST 20+ BEHAVIORAL INDICATORS
        </p>

        {/* Progress Line */}
        <div className="w-full bg-zinc-900 border border-zinc-800 h-2 p-0 mb-4">
          <div
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-right text-xs text-zinc-400 font-bold mb-6">
          [ {progress}% COMPLETED ]
        </div>

        {/* Dynamic Status Steps */}
        <div className="space-y-2 text-left max-w-md mx-auto text-xs">
          {steps.map((s, idx) => {
            const isFinished = stepIndex > idx;
            const isCurrent = stepIndex === idx;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 px-3 py-2 border transition-all ${
                  isCurrent
                    ? 'border-white bg-white text-black font-bold'
                    : isFinished
                    ? 'border-zinc-800 bg-zinc-950 text-zinc-400'
                    : 'border-zinc-900 text-zinc-700'
                }`}
              >
                <span className="shrink-0">
                  {isFinished ? '[ ✓ ]' : isCurrent ? '[ ✦ ]' : '[   ]'}
                </span>
                <span className="truncate">
                  0{idx + 1} // {s}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
