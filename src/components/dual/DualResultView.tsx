'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DualResultData } from '../../types/dual';
import { Lock, Unlock, CheckCircle2, AlertTriangle, MessageCircle, Heart, Share2, Sparkles, RefreshCw, Flame } from 'lucide-react';

interface DualResultViewProps {
  result: DualResultData;
  initialUnlocked?: boolean;
  onReset: () => void;
}

export const DualResultView: React.FC<DualResultViewProps> = ({
  result,
  initialUnlocked = false,
  onReset,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(initialUnlocked);

  useEffect(() => {
    if (initialUnlocked) {
      setIsUnlocked(true);
      import('canvas-confetti').then((confettiModule) => {
        const fireConfetti = confettiModule.default || confettiModule;
        fireConfetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }).catch((e) => console.error(e));
    }
  }, [initialUnlocked]);

  const handleUnlock = () => {
    setIsUnlocked(true);
    import('canvas-confetti').then((confettiModule) => {
      const fireConfetti = confettiModule.default || confettiModule;
      fireConfetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
    }).catch((e) => console.error(e));
  };

  const { synergyScore, synergyTier, freeHighlights, comparisonMatrix, conversationCards, mode } = result;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 sm:mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-palette-lilac/40 text-palette-slate text-xs font-black mb-2.5 border border-palette-slate/15">
          <Sparkles className="w-3.5 h-3.5 text-palette-coral" />
          <span>DUAL BACK-TO-BACK MATRIX GENERATED</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-palette-slate tracking-tight">
          Mutual Relational Synergy Report
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-palette-slate/75 font-medium">
          {mode === 'talking_stage' ? 'The Talking Stage Alignment Matrix' : 'Couples Depth & Love Language Alignment'}
        </p>
      </motion.div>

      {/* Hero Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-palette-slate text-white rounded-3xl p-6 sm:p-8 shadow-soft-flat relative overflow-hidden mb-6 sm:mb-8"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <div className="inline-block text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-palette-sand text-palette-slate mb-2">
              {synergyTier.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-1">
              {synergyTier.name}
            </h2>
            <p className="text-xs sm:text-sm text-palette-cream/80 font-medium max-w-md">
              {synergyTier.tagline}
            </p>
          </div>

          <div className="bg-white/10 border-2 border-white/20 rounded-3xl p-4 sm:p-5 text-center shrink-0 w-36 sm:w-40 shadow-inner">
            <span className="text-[10px] uppercase font-bold text-palette-sand block tracking-wider">
              Synergy Index
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white my-0.5">
              {synergyScore}%
            </div>
            <span className="text-[10px] text-palette-cream/70 font-semibold">
              {freeHighlights.matchCount} of 6 in sync
            </span>
          </div>
        </div>
      </motion.div>

      {/* FREE HIGHLIGHTS / CLIFFHANGER SECTION */}
      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strength Card */}
          <div className="bg-palette-sage/15 border border-palette-sage/35 rounded-3xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-palette-sage" />
              <h3 className="text-xs sm:text-sm font-black text-palette-slate uppercase tracking-wide">
                Silent Core Agreement
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-palette-slate/85 font-semibold leading-relaxed">
              {freeHighlights.topSharedStrength}
            </p>
          </div>

          {/* Friction / Blindspot Card */}
          <div className="bg-palette-coral/15 border border-palette-coral/35 rounded-3xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-palette-coral" />
              <h3 className="text-xs sm:text-sm font-black text-palette-slate uppercase tracking-wide">
                Perception Blindspot Detected
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-palette-slate/85 font-semibold leading-relaxed">
              {freeHighlights.topFrictionAlert}
            </p>
          </div>
        </div>
      </div>

      {!isUnlocked ? (
        /* LOCKED STATE: PAYWALL TEASER */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Locked Paywall Container */}
          <div className="rounded-3xl border-2 border-palette-slate/25 bg-palette-white p-6 sm:p-8 md:p-10 text-center shadow-soft-flat relative overflow-hidden">
            {/* Top Badge */}
            <div className="w-14 h-14 rounded-3xl bg-palette-coral text-white flex items-center justify-center text-2xl shadow-soft-flat mx-auto mb-3">
              <Lock className="w-7 h-7" />
            </div>

            <div className="inline-block text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-palette-slate text-palette-sand mb-2">
              SEALED BILATERAL DIAGNOSIS
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-palette-slate mb-2">
              Unlock The Full Dual Transparency Matrix
            </h3>
            <p className="text-xs sm:text-sm text-palette-slate/80 font-medium max-w-lg mx-auto leading-relaxed mb-6">
              Both of your secret answers are sealed. Unlock the complete question-by-question comparison, discover the unsaid hesitation, and get 3 late-night conversation cards.
            </p>

            {/* Value Checklist */}
            <div className="bg-palette-cream/40 border border-palette-slate/15 rounded-2xl p-4 sm:p-5 text-left text-xs sm:text-sm text-palette-slate font-bold space-y-3 max-w-lg mx-auto mb-6 shadow-xs">
              <div className="flex items-start gap-2.5">
                <span className="text-palette-sage font-black text-base leading-none">✓</span>
                <span><strong>Full 6-Question Breakdown:</strong> Side-by-side answers for Partner 1 & Partner 2</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-palette-sage font-black text-base leading-none">✓</span>
                <span><strong>The Unspoken Hesitation Revealed:</strong> What they quietly worry about</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-palette-sage font-black text-base leading-none">✓</span>
                <span><strong>3 Late-Night Conversation Cards:</strong> How to talk it through without awkwardness</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-palette-sage font-black text-base leading-none">✓</span>
                <span><strong>Instant 2-Phone Access:</strong> One payment unlocks the report on both devices</span>
              </div>
            </div>

            {/* Unlock Button */}
            <button
              onClick={handleUnlock}
              className="w-full max-w-lg mx-auto py-4 px-8 rounded-2xl bg-palette-coral hover:bg-palette-coral/90 text-white font-black text-sm sm:text-base shadow-soft-flat flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <Unlock className="w-5 h-5" />
              <span>Unlock Both Reports — $6.99 (One-Time)</span>
            </button>
            <p className="mt-2.5 text-[11px] text-palette-slate/60 font-semibold">
              One-time payment · Instant unlock for both partners · 100% Confidential
            </p>
          </div>
        </motion.div>
      ) : (
        /* UNLOCKED FULL REPORT VIEW */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Unlocked Banner */}
          <div className="bg-palette-sage text-white rounded-3xl p-5 sm:p-6 text-center shadow-soft-flat">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-palette-slate text-xs font-black mb-2">
              <CheckCircle2 className="w-4 h-4 text-palette-sage" />
              <span>DUAL MATRIX UNLOCKED · BOTH DEVICES ACTIVE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              The Side-by-Side Transparency Matrix
            </h3>
            <p className="text-xs text-palette-cream/80 font-medium mt-1">
              Objective Cross-Comparison Instrument · mixedsigns
            </p>
          </div>

          {/* SECTION 1: QUESTION-BY-QUESTION COMPARISON MATRIX */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-black text-palette-slate flex items-center gap-2">
                <span>🔍</span>
                <span>Question-by-Question Blind Comparison</span>
              </h3>
              <span className="text-xs font-bold text-palette-slate/60">
                6 Verified Data Points
              </span>
            </div>

            {comparisonMatrix.map((item, idx) => (
              <div
                key={item.questionId}
                className="bg-palette-white rounded-3xl p-5 sm:p-6 border border-palette-slate/15 shadow-soft-flat"
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-palette-slate text-palette-sand text-xs font-black flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-palette-slate/70">
                      {item.category}
                    </span>
                  </div>

                  <span className={`text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full ${
                    item.isMatch
                      ? 'bg-palette-sage/20 text-palette-sage'
                      : 'bg-palette-coral/15 text-palette-coral'
                  }`}>
                    {item.isMatch ? '✓ IN SYNC' : '⚡ DIVERGENT PERCEPTION'}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-black text-palette-slate mb-4">
                  {item.questionTitle}
                </h4>

                {/* 2-Column Side by Side Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {/* Partner 1 Card */}
                  <div className="rounded-2xl p-3.5 bg-palette-cream/40 border border-palette-slate/10">
                    <span className="text-[10px] font-black uppercase tracking-wider text-palette-coral block mb-1">
                      PARTNER 1's SECRET CHOICE
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-palette-slate leading-snug">
                      {item.p1Label}
                    </p>
                  </div>

                  {/* Partner 2 Card */}
                  <div className="rounded-2xl p-3.5 bg-palette-cream/40 border border-palette-slate/10">
                    <span className="text-[10px] font-black uppercase tracking-wider text-palette-slate/60 block mb-1">
                      PARTNER 2's SECRET CHOICE
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-palette-slate leading-snug">
                      {item.p2Label}
                    </p>
                  </div>
                </div>

                {/* Psychological Insight Bar */}
                <div className="p-3 rounded-2xl bg-palette-sand/20 border border-palette-sand/40 text-[11px] sm:text-xs text-palette-slate/90 font-medium leading-relaxed">
                  <strong className="text-palette-slate">✦ What This Means: </strong>
                  {item.insightText}
                </div>
              </div>
            ))}
          </div>

          {/* SECTION 2: 3 GUIDED EVENING CONVERSATION CARDS */}
          <div className="bg-palette-slate text-white rounded-3xl p-5 sm:p-8 shadow-soft-flat">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-palette-sand text-palette-slate text-xs font-black tracking-wide mb-3">
              <span>💬</span>
              <span>LATE-NIGHT CONVERSATION PROMPTS</span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-2">
              3 Questions To Bridge The Gap Tonight
            </h3>
            <p className="text-xs sm:text-sm text-palette-cream/80 font-medium mb-6 leading-relaxed">
              Use these cards while looking at the quiz results together. They turn potential defensiveness into intimate curiosity.
            </p>

            <div className="space-y-4">
              {conversationCards.map((card, cIdx) => (
                <div
                  key={cIdx}
                  className="rounded-2xl p-4 sm:p-5 bg-white/10 border border-white/15"
                >
                  <span className="text-[10px] font-black uppercase tracking-wider text-palette-sand block mb-1">
                    {card.tag}
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-white mb-2">
                    {card.title}
                  </h4>
                  <div className="p-3.5 rounded-xl bg-palette-slate/80 border border-palette-sand/30 mb-2">
                    <p className="text-xs sm:text-sm font-black text-palette-sand italic leading-relaxed">
                      {card.prompt}
                    </p>
                  </div>
                  <p className="text-[11px] text-palette-cream/70 font-semibold">
                    💡 <strong>Why it works:</strong> {card.whyItWorks}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: SOCIAL SHARE CARD (COUPLE SYNERGY BADGE) */}
          <div className="bg-palette-cream/60 border border-palette-slate/15 rounded-3xl p-5 sm:p-8 text-center shadow-soft-flat">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-palette-slate text-palette-sand text-[11px] font-black mb-3">
              <span>📸</span>
              <span>COUPLE SYNERGY STORY BADGE</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-palette-slate mb-1">
              Your Relational Synergy Badge
            </h3>
            <p className="text-xs text-palette-slate/75 font-medium mb-5">
              Share your verified alignment score on Instagram Story or keep it as a memory
            </p>

            {/* Preview Card */}
            <div className="max-w-xs mx-auto bg-palette-white rounded-3xl p-6 border-2 border-palette-slate shadow-soft-flat text-center mb-5">
              <span className="text-2xl mb-1 block">✿</span>
              <span className="text-[10px] font-black uppercase tracking-wider text-palette-slate/60 block">
                mixedsigns · Dual Diagnostic
              </span>
              <div className="text-3xl font-black text-palette-slate my-2">
                {synergyScore}% Synergy
              </div>
              <div className="inline-block text-[11px] font-black px-2.5 py-0.5 rounded-full bg-palette-coral text-white mb-2">
                {synergyTier.name}
              </div>
              <p className="text-[11px] text-palette-slate/80 font-semibold leading-snug">
                {mode === 'talking_stage' ? 'The Talking Stage Match' : 'Committed Couple Synergy'}
              </p>
            </div>

            <button
              onClick={() => alert("Image saved! Ready to share on Instagram / TikTok story.")}
              className="py-3 px-6 rounded-xl bg-palette-coral text-white font-extrabold text-xs shadow-soft-flat cursor-pointer hover:bg-palette-coral/90 transition-all inline-flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Save HD Synergy Card</span>
            </button>
          </div>

          {/* Reset / Retake */}
          <div className="text-center pt-2">
            <button
              onClick={onReset}
              className="px-6 py-2.5 rounded-xl bg-palette-white border border-palette-slate/20 text-palette-slate text-xs font-extrabold hover:bg-palette-lilac/30 transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake or Switch Mode</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
