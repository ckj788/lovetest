'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Lock, Compass, Activity, Clock } from 'lucide-react';

interface QuizLandingProps {
  onStart: () => void;
}

export const QuizLanding: React.FC<QuizLandingProps> = ({ onStart }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      {/* Top MBTI Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center mb-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-mbti-pink/10 via-mbti-purple/10 to-mbti-blue/10 border border-mbti-purple/20 shadow-sm text-mbti-purple text-xs md:text-sm font-semibold">
          <Sparkles className="w-4 h-4 text-mbti-pink animate-pulse" />
          <span>现象级关系行为测评 · 8 题精准深度拟合</span>
        </div>
      </motion.div>

      {/* Main Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-3xl p-6 md:p-10 text-center shadow-mbti relative overflow-hidden mb-8 border border-white/80"
      >
        {/* Ambient Gradient Glow Background */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-mbti-pink/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-mbti-purple/20 rounded-full blur-3xl pointer-events-none" />

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-black text-mbti-text tracking-tight mb-4 leading-tight">
          他到底喜不喜欢你？
          <span className="block mt-2 bg-gradient-mbti bg-clip-text text-transparent">
            8个行为信号拆解真相
          </span>
        </h1>

        <p className="text-base md:text-lg text-mbti-muted max-w-xl mx-auto mb-8 leading-relaxed">
          别再反复琢磨他的每一句聊天记录！基于他在主动性、时间投入、情绪回应与社交公开度的真实表现，全方位测算他的感情态度。
        </p>

        {/* 4 Core Dimensions Floating Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 max-w-2xl mx-auto">
          <div className="bg-white/80 border border-mbti-pink/20 rounded-2xl p-3 shadow-sm flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-mbti-pink/15 flex items-center justify-center text-mbti-pink mb-1.5">
              <Heart className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-mbti-text">Attraction</span>
            <span className="text-[10px] text-mbti-muted">好感/吸引度</span>
          </div>

          <div className="bg-white/80 border border-mbti-purple/20 rounded-2xl p-3 shadow-sm flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-mbti-purple/15 flex items-center justify-center text-mbti-purple mb-1.5">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-mbti-text">Investment</span>
            <span className="text-[10px] text-mbti-muted">行为投入度</span>
          </div>

          <div className="bg-white/80 border border-mbti-teal/20 rounded-2xl p-3 shadow-sm flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-mbti-teal/15 flex items-center justify-center text-mbti-teal mb-1.5">
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-mbti-text">Commitment</span>
            <span className="text-[10px] text-mbti-muted">关系承诺意愿</span>
          </div>

          <div className="bg-white/80 border border-mbti-blue/20 rounded-2xl p-3 shadow-sm flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-mbti-blue/15 flex items-center justify-center text-mbti-blue mb-1.5">
              <Lock className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-mbti-text">Exclusivity</span>
            <span className="text-[10px] text-mbti-muted">排他与忠诚度</span>
          </div>
        </div>

        {/* Big Start Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-mbti text-white font-extrabold text-lg shadow-glow-purple flex items-center justify-center gap-3 mx-auto transition-all cursor-pointer"
        >
          <span>立即开始测评 (8题 · 60秒)</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        {/* Time guarantee */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-mbti-muted">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-mbti-purple" />
            只需约 60 秒
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-mbti-teal" />
            无需注册登录
          </span>
        </div>
      </motion.div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/70 border border-mbti-border/80 rounded-2xl p-5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-mbti-pink/10 text-mbti-pink flex items-center justify-center mb-3 font-bold text-lg">
            01
          </div>
          <h3 className="font-bold text-mbti-text mb-1 text-sm">拒绝无用嘴炮</h3>
          <p className="text-xs text-mbti-muted leading-relaxed">
            不看他说过的甜言蜜语，专注于客观发生的行为细节与社交痕迹。
          </p>
        </div>

        <div className="bg-white/70 border border-mbti-border/80 rounded-2xl p-5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-mbti-purple/10 text-mbti-purple flex items-center justify-center mb-3 font-bold text-lg">
            02
          </div>
          <h3 className="font-bold text-mbti-text mb-1 text-sm">解析 Attraction Gap</h3>
          <p className="text-xs text-mbti-muted leading-relaxed">
            诊断为什么他明明表现得很喜欢你，却迟迟不跟你确定正式关系。
          </p>
        </div>

        <div className="bg-white/70 border border-mbti-border/80 rounded-2xl p-5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-mbti-teal/10 text-mbti-teal flex items-center justify-center mb-3 font-bold text-lg">
            03
          </div>
          <h3 className="font-bold text-mbti-text mb-1 text-sm">未来 7 天 Action Guide</h3>
          <p className="text-xs text-mbti-muted leading-relaxed">
            不给空洞概念，直接生成具体可执行的试探与应对策略。
          </p>
        </div>
      </div>
    </div>
  );
};
