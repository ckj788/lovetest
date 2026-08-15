'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuizResultData } from '../types/quiz';
import { Copy, Check, Share2, Heart, Activity, Compass, Lock } from 'lucide-react';

interface ShareCardProps {
  result: QuizResultData;
}

export const ShareCard: React.FC<ShareCardProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);
  const { archetype, totalScore, scores, gap } = result;

  const handleCopy = () => {
    const textToCopy = `✨ My SignalQuiz Diagnosis Report ✨\n` +
      `🔮 Archetype: ${archetype.emoji} ${archetype.name}\n` +
      `📊 Interest Index: ${totalScore}/100 | Delulu Gap: ${gap}%\n` +
      `🔥 Natural Attraction: ${scores.attraction}%\n` +
      `⚡ Time & Effort: ${scores.investment}%\n` +
      `💍 Commitment Intent: ${scores.commitment}%\n` +
      `🔒 Exclusive Focus: ${scores.exclusivity}%\n\n` +
      `💡 Golden Insight: "${archetype.report.socialQuote}"\n\n` +
      `👉 Take the 60s quiz: https://signalquiz.app`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="my-8">
      {/* Social Card Preview Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="soft-card p-6 md:p-8 bg-palette-white border-2 border-palette-slate/15 relative overflow-hidden shadow-soft-flat max-w-lg mx-auto"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-palette-slate/10">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-palette-slate text-palette-cream flex items-center justify-center font-bold text-xs">
              ✿
            </span>
            <span className="font-extrabold text-xs tracking-wider uppercase text-palette-slate">
              SIGNALQUIZ · RELATIONSHIP MBTI
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-palette-lilac/40 text-palette-slate border border-palette-slate/10">
            OFFICIAL REPORT
          </span>
        </div>

        {/* Archetype Hero Box */}
        <div className="bg-palette-cream/70 rounded-3xl p-5 mb-5 border border-palette-slate/10 relative text-center">
          <div className="absolute top-4 right-4 text-palette-coral text-sm">✿</div>
          
          <div className="w-16 h-16 rounded-2xl bg-palette-white flex items-center justify-center text-4xl mx-auto mb-2 shadow-xs border border-palette-slate/10">
            {archetype.emoji}
          </div>

          <div className="inline-block text-[11px] font-extrabold px-3 py-0.5 rounded-full bg-palette-sand text-palette-slate mb-1">
            {archetype.tag}
          </div>

          <h3 className="text-2xl font-black text-palette-slate">
            {archetype.name}
          </h3>

          <p className="text-xs text-palette-slate/75 font-medium mt-1 max-w-xs mx-auto">
            {archetype.report.shareSummary}
          </p>
        </div>

        {/* Core Golden Quote Box (High Sharability) */}
        <div className="bg-palette-slate text-white rounded-2xl p-4 mb-5 shadow-xs relative">
          <div className="text-palette-sand text-lg font-serif leading-none mb-1">“</div>
          <p className="text-xs md:text-sm font-bold leading-relaxed text-palette-cream italic px-1">
            {archetype.report.socialQuote}
          </p>
          <div className="text-right text-palette-sand text-lg font-serif leading-none mt-1">”</div>
        </div>

        {/* 4 Dimension Bar Snapshot */}
        <div className="grid grid-cols-2 gap-2 mb-5 text-[11px] font-bold text-palette-slate">
          <div className="bg-palette-lilac/40 p-2.5 rounded-xl border border-palette-slate/10 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-palette-coral" />
              Attraction
            </span>
            <span className="font-black text-palette-coral">{scores.attraction}%</span>
          </div>

          <div className="bg-palette-sand/40 p-2.5 rounded-xl border border-palette-slate/10 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-palette-slate" />
              Effort
            </span>
            <span className="font-black text-palette-slate">{scores.investment}%</span>
          </div>

          <div className="bg-palette-sage/30 p-2.5 rounded-xl border border-palette-slate/10 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-palette-sage" />
              Commitment
            </span>
            <span className="font-black text-palette-slate">{scores.commitment}%</span>
          </div>

          <div className="bg-palette-cream p-2.5 rounded-xl border border-palette-slate/10 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-palette-coral" />
              Exclusivity
            </span>
            <span className="font-black text-palette-coral">{scores.exclusivity}%</span>
          </div>
        </div>

        {/* Score & Stamp */}
        <div className="flex items-center justify-between pt-3 border-t border-palette-slate/10 text-xs">
          <div>
            <span className="text-[10px] text-palette-slate/60 font-bold uppercase block">Overall Match</span>
            <span className="text-base font-black text-palette-coral">{totalScore} <span className="text-[10px] text-palette-slate/50 font-normal">/100</span></span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-palette-slate/60 font-bold uppercase block">Diagnosis Stamp</span>
            <span className="text-xs font-mono font-extrabold text-palette-slate">#SIGNALQUIZ</span>
          </div>
        </div>
      </motion.div>

      {/* Share & Copy Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4 max-w-lg mx-auto">
        <button
          onClick={handleCopy}
          className="w-full sm:w-1/2 py-3 px-4 rounded-2xl bg-palette-slate text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-palette-slate/90 transition-all cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-palette-sand" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied Summary!' : 'Copy for Group Chat'}</span>
        </button>

        <button
          onClick={handleCopy}
          className="w-full sm:w-1/2 py-3 px-4 rounded-2xl bg-palette-coral text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-soft-coral hover:opacity-95 transition-all cursor-pointer border border-palette-coral"
        >
          <Share2 className="w-4 h-4" />
          <span>Share to Instagram Story</span>
        </button>
      </div>
    </div>
  );
};
