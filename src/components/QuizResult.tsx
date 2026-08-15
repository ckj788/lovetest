'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuizResultData } from '../types/quiz';
import { Lock, Unlock, Sparkles, AlertCircle, CheckCircle2, ChevronRight, Compass, Heart, Activity } from 'lucide-react';
import { PaywallModal } from './PaywallModal';
import { ShareCard } from './ShareCard';

interface QuizResultProps {
  result: QuizResultData;
  onReset: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({ result, onReset }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);

  const { scores, totalScore, gap, archetype, freeSummary } = result;
  const report = archetype.report;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-palette-lilac/40 text-palette-slate text-xs font-bold mb-3 border border-palette-slate/15">
          <span className="text-palette-coral">✿</span>
          <span>8-DIMENSIONAL BEHAVIORAL DIAGNOSIS COMPLETE</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-palette-slate tracking-tight">
          His Signal Breakdown Report
        </h1>
      </motion.div>

      {/* Main Archetype Card (Soft Flat Style) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-palette-slate text-white rounded-3xl p-6 md:p-10 shadow-soft-flat relative overflow-hidden mb-8"
      >
        {/* Top-right Flower Accent */}
        <div className="absolute top-6 right-6 text-palette-sand/40 text-2xl font-bold select-none">
          ✿
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          {/* Emoji Badge */}
          <div className="w-24 h-24 rounded-3xl bg-palette-white/15 border border-white/20 p-2 shrink-0 flex items-center justify-center text-5xl shadow-sm">
            {archetype.emoji}
          </div>

          <div className="flex-1">
            <div className="inline-block text-xs font-extrabold px-3 py-1 rounded-full bg-palette-sand text-palette-slate mb-2">
              {archetype.tag}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
              {archetype.name}
            </h2>
            <p className="text-xs md:text-sm font-semibold text-palette-cream/80 leading-relaxed">
              {archetype.subtitle}
            </p>
          </div>

          {/* Score Box */}
          <div className="bg-palette-white/10 border border-white/20 rounded-2xl p-4 text-center shrink-0 min-w-[110px]">
            <div className="text-[10px] font-bold text-palette-cream/70 uppercase tracking-wider mb-1">
              Interest Index
            </div>
            <div className="text-3xl font-black text-palette-sand">
              {totalScore}
              <span className="text-xs text-palette-cream/60 font-normal"> /100</span>
            </div>
          </div>
        </div>

        <p className="mt-6 pt-6 border-t border-white/15 text-xs md:text-sm text-palette-cream/90 leading-relaxed font-medium">
          {archetype.description}
        </p>
      </motion.div>

      {/* 4 Dimension Scores Matrix (Updated Names) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
        {/* Attraction: Lilac */}
        <div className="bg-palette-lilac rounded-2xl p-4 shadow-xs border border-palette-slate/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-palette-slate flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-palette-coral" />
              Attraction
            </span>
            <span className="text-sm font-black text-palette-slate">{scores.attraction}</span>
          </div>
          <div className="w-full bg-palette-white/60 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-palette-coral rounded-full" style={{ width: `${scores.attraction}%` }} />
          </div>
          <span className="text-[10px] text-palette-slate/75 mt-1.5 block font-semibold">Natural Spark</span>
        </div>

        {/* Time & Effort: Slate */}
        <div className="bg-palette-slate text-white rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-palette-cream flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-palette-sand" />
              Time & Effort
            </span>
            <span className="text-sm font-black text-palette-sand">{scores.investment}</span>
          </div>
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-palette-sand rounded-full" style={{ width: `${scores.investment}%` }} />
          </div>
          <span className="text-[10px] text-palette-cream/70 mt-1.5 block font-medium">Real Investment</span>
        </div>

        {/* Commitment Intent: Sage Green */}
        <div className="bg-palette-sage text-white rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-palette-cream" />
              Commitment
            </span>
            <span className="text-sm font-black text-white">{scores.commitment}</span>
          </div>
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: `${scores.commitment}%` }} />
          </div>
          <span className="text-[10px] text-palette-cream/80 mt-1.5 block font-medium">DTR Readiness</span>
        </div>

        {/* Exclusive Focus: Sand */}
        <div className="bg-palette-sand rounded-2xl p-4 shadow-xs border border-palette-slate/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-palette-slate flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-palette-coral" />
              Exclusivity
            </span>
            <span className="text-sm font-black text-palette-slate">{scores.exclusivity}</span>
          </div>
          <div className="w-full bg-palette-white/60 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-palette-coral rounded-full" style={{ width: `${scores.exclusivity}%` }} />
          </div>
          <span className="text-[10px] text-palette-slate/75 mt-1.5 block font-semibold">Roster & Focus</span>
        </div>
      </div>

      {/* Free Attraction vs Commitment Gap Box */}
      <div className="bg-palette-white border border-palette-slate/15 rounded-3xl p-6 mb-8 shadow-soft-flat">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-5 h-5 text-palette-coral shrink-0" />
          <h3 className="font-extrabold text-palette-slate text-base md:text-lg">
            Core Conflict: Attraction vs Commitment Gap
          </h3>
        </div>
        <p className="text-xs md:text-sm text-palette-slate/80 mb-4 leading-relaxed font-medium">
          {freeSummary}
        </p>

        <div className="bg-palette-cream/60 rounded-2xl p-4 border border-palette-slate/10">
          <div className="flex items-center justify-between text-xs md:text-sm font-bold mb-2">
            <span className="text-palette-coral">Natural Attraction: {scores.attraction}%</span>
            <span className="text-palette-slate">Commitment Intent: {scores.commitment}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-palette-slate/10 h-3 rounded-full overflow-hidden flex">
              <div className="h-full bg-palette-coral" style={{ width: `${scores.attraction}%` }} />
              <div className="h-full bg-palette-slate" style={{ width: `${scores.commitment}%` }} />
            </div>
            <span className="text-xs font-black text-white px-2.5 py-0.5 rounded-lg bg-palette-slate">
              Gap = {gap}%
            </span>
          </div>
          <p className="text-xs text-palette-slate/75 mt-3 font-medium">
            💡 Cosmic Insight: {archetype.gapAnalysis}
          </p>
        </div>
      </div>

      {/* MBTI Social Share Card Preview */}
      <ShareCard result={result} />

      {/* Paywall / Unlocked Deep Report Container */}
      {!isUnlocked ? (
        <div className="soft-card p-6 md:p-8 relative overflow-hidden mb-8 border border-palette-slate/20 bg-palette-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-palette-coral/15 flex items-center justify-center text-palette-coral">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-palette-slate">
                Locked Deep Diagnosis Report
              </h3>
            </div>
            <span className="text-xs text-palette-slate font-bold bg-palette-lilac/50 px-3 py-1 rounded-full border border-palette-slate/15">
              5 Sections + 7-Day Plan Locked
            </span>
          </div>

          {/* Locked Insight Cards Preview */}
          <div className="space-y-4 mb-8">
            {report.sections.slice(0, 4).map((sec, idx) => (
              <div key={idx} className="bg-palette-cream/40 border border-palette-slate/10 rounded-2xl p-4 filter blur-[1.5px] opacity-70 select-none">
                <div className="flex items-center justify-between font-bold text-sm text-palette-slate mb-1">
                  <span>🔒 {sec.tag}: {sec.title}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
                <p className="text-xs text-palette-slate/60">
                  {sec.paragraphs[0]}
                </p>
              </div>
            ))}
          </div>

          {/* Big Unlock Button */}
          <div className="text-center relative z-20">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsPaywallOpen(true)}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-palette-coral text-white font-extrabold text-base shadow-soft-coral flex items-center justify-center gap-3 mx-auto cursor-pointer border border-palette-coral"
            >
              <Unlock className="w-5 h-5" />
              <span>Unlock Full Report ($9.90 Trial)</span>
            </motion.button>

            <p className="mt-3 text-xs text-palette-slate/60 font-medium">
              Demo Mode: Click to preview full unlocked report instantly
            </p>
          </div>
        </div>
      ) : (
        /* UNLOCKED FULL REPORT VIEW (DEEP ESSAY FORMAT MATCHING SLOW BURNER) */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 mb-8"
        >
          {/* Header Unlocked Banner */}
          <div className="bg-palette-sage text-white rounded-3xl p-6 text-center shadow-soft-flat">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-palette-slate text-xs font-extrabold mb-2">
              <CheckCircle2 className="w-4 h-4 text-palette-sage" />
              REPORT UNLOCKED
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white">
              《{archetype.name}》Deep Blueprint & Action Guide
            </h3>
            <p className="text-xs text-palette-cream/80 font-medium mt-1">
              Full behavioral breakdown & psychological analysis
            </p>
          </div>

          {/* Core Hook Block */}
          <div className="bg-palette-white rounded-3xl p-6 shadow-xs border border-palette-slate/15">
            <h4 className="text-xs font-bold uppercase tracking-wider text-palette-coral mb-2">
              EXECUTIVE DIAGNOSIS
            </h4>
            <p className="text-sm md:text-base font-extrabold text-palette-slate leading-relaxed">
              {report.hook}
            </p>

            <div className="mt-4 pt-4 border-t border-palette-slate/10 space-y-2">
              {report.summaryHighlights.map((highlight, hIdx) => (
                <div key={hIdx} className="flex items-start gap-2 text-xs font-semibold text-palette-slate/80">
                  <span className="text-palette-coral">✦</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Sections Render */}
          {report.sections.map((sec, secIdx) => (
            <div key={secIdx} className="bg-palette-white rounded-3xl p-6 shadow-xs border border-palette-slate/15">
              <div className="inline-block text-[11px] font-extrabold px-3 py-0.5 rounded-full bg-palette-lilac/40 text-palette-slate mb-2">
                {sec.tag}
              </div>
              <h4 className="font-extrabold text-base md:text-lg text-palette-slate mb-3">
                {sec.title}
              </h4>

              <div className="space-y-3 text-xs md:text-sm text-palette-slate/80 leading-relaxed font-medium">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {sec.bullets && sec.bullets.length > 0 && (
                <div className="mt-4 pt-4 border-t border-palette-slate/10 space-y-2.5">
                  {sec.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="bg-palette-cream/60 p-3 rounded-2xl border border-palette-slate/10 text-xs font-semibold text-palette-slate flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-palette-slate text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {bIdx + 1}
                      </span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Bottom Line Summary Card */}
          <div className="bg-palette-slate text-white rounded-3xl p-6 md:p-8 shadow-soft-flat">
            <h4 className="text-xs font-extrabold tracking-widest uppercase text-palette-sand mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-palette-coral" />
              THE BOTTOM LINE
            </h4>

            <div className="space-y-3 text-xs md:text-sm text-palette-cream/90 leading-relaxed font-medium">
              {report.bottomLine.map((line, lIdx) => (
                <p key={lIdx}>{line}</p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Share / Restart Actions */}
      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-palette-white border border-palette-slate/20 hover:bg-palette-lilac/30 text-palette-slate font-extrabold text-sm shadow-xs transition-all cursor-pointer"
        >
          Retake Diagnosis
        </button>
      </div>

      {/* Paywall Modal */}
      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        onUnlockSuccess={() => {
          setIsPaywallOpen(false);
          setIsUnlocked(true);
        }}
        archetypeName={archetype.name}
      />
    </div>
  );
};
