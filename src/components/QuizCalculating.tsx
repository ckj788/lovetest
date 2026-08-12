'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Activity, Compass, Lock, CheckCircle } from 'lucide-react';

interface QuizCalculatingProps {
  onComplete: () => void;
}

export const QuizCalculating: React.FC<QuizCalculatingProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    { label: '匹配行为信号: 浪漫吸引度 (Attraction)', icon: Heart, color: 'text-mbti-pink' },
    { label: '测算心智占用: 行为投入度 (Investment)', icon: Activity, color: 'text-mbti-purple' },
    { label: '评估关系定义: 承诺意愿 (Commitment)', icon: Compass, color: 'text-mbti-teal' },
    { label: '拟合风险模型: 排他与忠诚度 (Exclusivity)', icon: Lock, color: 'text-mbti-blue' },
    { label: '生成报告与 7 天 Action Guide...', icon: Sparkles, color: 'text-mbti-yellow' },
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
        className="glass-card rounded-3xl p-8 md:p-12 shadow-mbti relative overflow-hidden"
      >
        {/* Animated Radar Pulse Circle */}
        <div className="relative w-28 h-28 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-mbti opacity-20 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-gradient-mbti opacity-40 animate-pulse" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-mbti flex items-center justify-center text-white shadow-glow-purple">
            <CurrentIcon className="w-10 h-10 animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-mbti-text mb-2">
          正在计算关系匹配模型...
        </h2>
        <p className="text-sm text-mbti-muted mb-8">
          基于 8 组核心行为证据和 20+ 个信号特征进行维度拟合
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-mbti-purple/10 h-3 rounded-full overflow-hidden p-0.5 mb-6">
          <div
            className="h-full bg-gradient-mbti rounded-full transition-all duration-100 ease-linear"
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
                className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs md:text-sm transition-all ${
                  isCurrent
                    ? 'bg-mbti-purple/10 font-bold text-mbti-purple border border-mbti-purple/30'
                    : isFinished
                    ? 'text-mbti-muted/70 opacity-70'
                    : 'text-mbti-muted/40 opacity-40'
                }`}
              >
                {isFinished ? (
                  <CheckCircle className="w-4 h-4 text-mbti-teal shrink-0" />
                ) : (
                  <StepIcon className={`w-4 h-4 ${s.color} shrink-0 ${isCurrent ? 'animate-spin' : ''}`} />
                )}
                <span>{s.label}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
