'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuizResultData } from '../types/quiz';
import { Lock, Unlock, Sparkles, AlertCircle, CheckCircle2, ChevronRight, Compass, Heart, Activity } from 'lucide-react';
import { PaywallModal } from './PaywallModal';

interface QuizResultProps {
  result: QuizResultData;
  onReset: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({ result, onReset }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);

  const { scores, totalScore, gap, archetype, freeSummary } = result;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mbti-purple/10 text-mbti-purple text-xs font-bold mb-3 border border-mbti-purple/20">
          <Sparkles className="w-3.5 h-3.5 text-mbti-pink" />
          <span>8-DIMENSIONAL BEHAVIORAL DIAGNOSIS COMPLETE</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-mbti-text tracking-tight">
          His Signal Breakdown Report
        </h1>
      </motion.div>

      {/* Main Archetype Card (Co-Star Style) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-3xl p-6 md:p-10 shadow-mbti relative overflow-hidden border border-white mb-8"
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-mbti-pink/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-mbti-purple/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          {/* Emoji Badge */}
          <div className="w-24 h-24 rounded-3xl bg-gradient-mbti p-1 shadow-glow-purple shrink-0 flex items-center justify-center">
            <div className="w-full h-full rounded-[22px] bg-white flex items-center justify-center text-5xl">
              {archetype.emoji}
            </div>
          </div>

          <div className="flex-1">
            <div className="inline-block text-xs font-extrabold px-3 py-1 rounded-full bg-mbti-purple/10 text-mbti-purple mb-2">
              {archetype.tag}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-mbti-text mb-2">
              {archetype.name}
            </h2>
            <p className="text-xs md:text-sm font-semibold text-mbti-muted leading-relaxed">
              {archetype.subtitle}
            </p>
          </div>

          {/* Score Circle */}
          <div className="bg-mbti-bg/90 border border-mbti-border rounded-2xl p-4 text-center shrink-0 min-w-[110px]">
            <div className="text-[10px] font-bold text-mbti-muted uppercase tracking-wider mb-1">
              Interest Index
            </div>
            <div className="text-3xl font-black bg-gradient-mbti bg-clip-text text-transparent">
              {totalScore}
              <span className="text-xs text-mbti-muted font-normal"> /100</span>
            </div>
          </div>
        </div>

        <p className="mt-6 pt-6 border-t border-mbti-border/60 text-xs md:text-sm text-mbti-text leading-relaxed">
          {archetype.description}
        </p>
      </motion.div>

      {/* 4 Dimension Scores Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
        <div className="bg-white/80 border border-mbti-pink/20 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-mbti-muted flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-mbti-pink" />
              Attraction
            </span>
            <span className="text-sm font-black text-mbti-pink">{scores.attraction}</span>
          </div>
          <div className="w-full bg-mbti-pink/15 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-mbti-pink rounded-full" style={{ width: `${scores.attraction}%` }} />
          </div>
          <span className="text-[10px] text-mbti-muted mt-1.5 block">Subconscious Chemistry</span>
        </div>

        <div className="bg-white/80 border border-mbti-purple/20 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-mbti-muted flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-mbti-purple" />
              Investment
            </span>
            <span className="text-sm font-black text-mbti-purple">{scores.investment}</span>
          </div>
          <div className="w-full bg-mbti-purple/15 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-mbti-purple rounded-full" style={{ width: `${scores.investment}%` }} />
          </div>
          <span className="text-[10px] text-mbti-muted mt-1.5 block">Real Time & Effort</span>
        </div>

        <div className="bg-white/80 border border-mbti-teal/20 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-mbti-muted flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-mbti-teal" />
              Commitment
            </span>
            <span className="text-sm font-black text-mbti-teal">{scores.commitment}</span>
          </div>
          <div className="w-full bg-mbti-teal/15 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-mbti-teal rounded-full" style={{ width: `${scores.commitment}%` }} />
          </div>
          <span className="text-[10px] text-mbti-muted mt-1.5 block">DTR Willingness</span>
        </div>

        <div className="bg-white/80 border border-mbti-blue/20 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-mbti-muted flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-mbti-blue" />
              Exclusivity
            </span>
            <span className="text-sm font-black text-mbti-blue">{scores.exclusivity}</span>
          </div>
          <div className="w-full bg-mbti-blue/15 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-mbti-blue rounded-full" style={{ width: `${scores.exclusivity}%` }} />
          </div>
          <span className="text-[10px] text-mbti-muted mt-1.5 block">Roster & Boundary</span>
        </div>
      </div>

      {/* Free Attraction vs Commitment Gap Box (Key Commercial Hook) */}
      <div className="bg-gradient-to-r from-mbti-pink/10 via-mbti-purple/10 to-mbti-blue/10 border border-mbti-purple/30 rounded-3xl p-6 mb-8 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-5 h-5 text-mbti-purple shrink-0" />
          <h3 className="font-extrabold text-mbti-text text-base md:text-lg">
            Core Conflict: Attraction vs Commitment Gap
          </h3>
        </div>
        <p className="text-xs md:text-sm text-mbti-muted mb-4 leading-relaxed">
          {freeSummary}
        </p>

        <div className="bg-white/90 rounded-2xl p-4 border border-mbti-border">
          <div className="flex items-center justify-between text-xs md:text-sm font-bold mb-2">
            <span className="text-mbti-pink">Attraction: {scores.attraction}%</span>
            <span className="text-mbti-teal">Commitment: {scores.commitment}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-mbti-purple/10 h-3 rounded-full overflow-hidden flex">
              <div className="h-full bg-mbti-pink" style={{ width: `${scores.attraction}%` }} />
              <div className="h-full bg-mbti-teal" style={{ width: `${scores.commitment}%` }} />
            </div>
            <span className="text-xs font-black text-mbti-purple px-2 py-0.5 rounded-md bg-mbti-purple/10">
              Gap = {gap}%
            </span>
          </div>
          <p className="text-[11px] text-mbti-muted mt-3">
            💡 Cosmic Insight: {archetype.gapAnalysis}
          </p>
        </div>
      </div>

      {/* Paywall / Unlocked Deep Report Container */}
      {!isUnlocked ? (
        <div className="glass-card rounded-3xl p-6 md:p-8 shadow-xl border border-mbti-purple/40 relative overflow-hidden mb-8">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white pointer-events-none z-10" style={{ height: '140px' }} />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-mbti-pink/15 flex items-center justify-center text-mbti-pink">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-mbti-text">
                Locked Deep Diagnosis Report
              </h3>
            </div>
            <span className="text-xs text-mbti-pink font-bold bg-mbti-pink/10 px-2.5 py-1 rounded-full">
              4 Sections Locked
            </span>
          </div>

          {/* Locked Insight Cards Preview */}
          <div className="space-y-4 mb-8">
            <div className="bg-white/90 border border-mbti-border rounded-2xl p-4 shadow-sm filter blur-[2px] opacity-70 select-none">
              <div className="flex items-center justify-between font-bold text-sm text-mbti-text mb-1">
                <span>🔒 Section 1: Why does he flirt like a boyfriend but avoid the DTR?</span>
                <ChevronRight className="w-4 h-4" />
              </div>
              <p className="text-xs text-mbti-muted">
                He enjoys low-pressure romance without giving up single perks...
              </p>
            </div>

            <div className="bg-white/90 border border-mbti-border rounded-2xl p-4 shadow-sm filter blur-[2px] opacity-70 select-none">
              <div className="flex items-center justify-between font-bold text-sm text-mbti-text mb-1">
                <span>🔒 Section 2: Is he genuine, or is he just enjoying the free trial?</span>
                <ChevronRight className="w-4 h-4" />
              </div>
              <p className="text-xs text-mbti-muted">
                3 behavioral receipts that reveal his real motives...
              </p>
            </div>

            <div className="bg-white/90 border border-mbti-border rounded-2xl p-4 shadow-sm filter blur-[2px] opacity-70 select-none">
              <div className="flex items-center justify-between font-bold text-sm text-mbti-text mb-1">
                <span>🔒 Section 3: Stealth Roster & Social Boundaries Check</span>
                <ChevronRight className="w-4 h-4" />
              </div>
              <p className="text-xs text-mbti-muted">
                Analyzing his IG activity, story likes, and roster energy...
              </p>
            </div>

            <div className="bg-white/90 border border-mbti-border rounded-2xl p-4 shadow-sm filter blur-[2px] opacity-70 select-none">
              <div className="flex items-center justify-between font-bold text-sm text-mbti-text mb-1">
                <span>🔒 Section 4: 7-Day Power Playbook (Should you text or pull back?)</span>
                <ChevronRight className="w-4 h-4" />
              </div>
              <p className="text-xs text-mbti-muted">
                4 tactical steps: Stop text firsts, match his energy, the 72h test...
              </p>
            </div>
          </div>

          {/* Big Unlock Button */}
          <div className="text-center relative z-20">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsPaywallOpen(true)}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-mbti text-white font-extrabold text-lg shadow-glow-purple flex items-center justify-center gap-3 mx-auto cursor-pointer"
            >
              <Unlock className="w-5 h-5" />
              <span>Unlock Full Report ($9.90 Trial)</span>
            </motion.button>

            <p className="mt-3 text-xs text-mbti-muted flex items-center justify-center gap-1">
              <span>Demo Mode: Click to preview full unlocked report instantly</span>
            </p>
          </div>
        </div>
      ) : (
        /* UNLOCKED FULL REPORT VIEW */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 mb-8"
        >
          <div className="bg-gradient-to-r from-mbti-teal/15 via-mbti-purple/15 to-mbti-pink/15 border border-mbti-teal/40 rounded-3xl p-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mbti-teal text-white text-xs font-bold mb-2">
              <CheckCircle2 className="w-4 h-4" />
              REPORT UNLOCKED
            </div>
            <h3 className="text-xl md:text-2xl font-black text-mbti-text">
              《{archetype.name}》Deep Blueprint & Action Guide
            </h3>
          </div>

          {/* Insight 1 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-mbti-border">
            <h4 className="font-extrabold text-base md:text-lg text-mbti-text mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-mbti-pink/15 text-mbti-pink flex items-center justify-center text-xs">01</span>
              Why does he flirt like a boyfriend but avoid the DTR?
            </h4>
            <p className="text-xs md:text-sm text-mbti-muted leading-relaxed bg-mbti-bg p-4 rounded-2xl border border-mbti-border/60">
              {archetype.unlockedInsights.whyNotAdvancing}
            </p>
          </div>

          {/* Insight 2 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-mbti-border">
            <h4 className="font-extrabold text-base md:text-lg text-mbti-text mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-mbti-purple/15 text-mbti-purple flex items-center justify-center text-xs">02</span>
              Is he genuine, or is he just enjoying the free trial?
            </h4>
            <p className="text-xs md:text-sm text-mbti-muted leading-relaxed bg-mbti-bg p-4 rounded-2xl border border-mbti-border/60">
              {archetype.unlockedInsights.seriousVsAmbiguous}
            </p>
          </div>

          {/* Insight 3 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-mbti-border">
            <h4 className="font-extrabold text-base md:text-lg text-mbti-text mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-mbti-blue/15 text-mbti-blue flex items-center justify-center text-xs">03</span>
              Stealth Roster & Social Boundaries Analysis
            </h4>
            <p className="text-xs md:text-sm text-mbti-muted leading-relaxed bg-mbti-bg p-4 rounded-2xl border border-mbti-border/60">
              {archetype.unlockedInsights.exclusivitySignals}
            </p>
          </div>

          {/* Insight 4: Action Guide 7 Days */}
          <div className="bg-gradient-to-br from-mbti-purple/10 to-mbti-pink/10 rounded-3xl p-6 border border-mbti-purple/30 shadow-md">
            <h4 className="font-extrabold text-base md:text-lg text-mbti-text mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-mbti-pink" />
              7-Day Power Playbook (Action Plan)
            </h4>

            <div className="space-y-2.5">
              {archetype.unlockedInsights.actionGuide7Days.map((step, idx) => (
                <div key={idx} className="bg-white/90 rounded-2xl p-3.5 border border-mbti-border flex items-start gap-3 shadow-xs">
                  <div className="w-5 h-5 rounded-full bg-mbti-purple text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-mbti-text leading-relaxed">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Share / Restart Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white border border-mbti-border hover:bg-mbti-purple/5 text-mbti-text font-bold text-sm shadow-sm transition-all cursor-pointer"
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
