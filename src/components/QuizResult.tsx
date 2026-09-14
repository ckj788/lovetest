'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QuizResultData } from '../types/quiz';
import { Lock, Unlock, Sparkles, AlertCircle, CheckCircle2, ChevronRight, Compass, Heart, Activity } from 'lucide-react';
import { PaywallModal } from './PaywallModal';
import { ShareCard } from './ShareCard';
import { getArchetypeCliffhanger, getPathVerdict } from '../utils/cliffhangers';

interface QuizResultProps {
  result: QuizResultData;
  onReset: () => void;
  initialUnlocked?: boolean;
}

export const QuizResult: React.FC<QuizResultProps> = ({ result, onReset, initialUnlocked = false }) => {
  const [isUnlocked, setIsUnlocked] = useState(initialUnlocked);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const autoOpenTriggered = React.useRef(false);

  useEffect(() => {
    if (initialUnlocked || autoOpenTriggered.current) return;

    const timer = setTimeout(() => {
      autoOpenTriggered.current = true;
      setIsPaywallOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [initialUnlocked]);

  useEffect(() => {
    if (initialUnlocked) {
      setIsUnlocked(true);
      setIsPaywallOpen(false);
      import('canvas-confetti')
        .then((confettiModule) => {
          const fireConfetti = confettiModule.default || confettiModule;
          fireConfetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
          });
        })
        .catch((e) => console.error(e));
    }
  }, [initialUnlocked]);

  const { scores, totalScore, gap, archetype, freeSummary } = result;
  const cliffhanger = getArchetypeCliffhanger(archetype.id, gap, scores);
  const pathVerdict = getPathVerdict(archetype.id, scores, gap);
  const report = archetype.report;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 md:py-12">
      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 sm:mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-palette-lilac/40 text-palette-slate text-[11px] sm:text-xs font-bold mb-2.5 sm:mb-3 border border-palette-slate/15">
          <span className="text-palette-coral">✿</span>
          <span>8-DIMENSIONAL BEHAVIORAL DIAGNOSIS COMPLETE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-palette-slate tracking-tight">
          Signal Breakdown Report
        </h1>
      </motion.div>

      {/* Main Archetype Card (Soft Flat Style) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-palette-slate text-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-soft-flat relative overflow-hidden mb-6 sm:mb-8"
      >
        {/* Top-right Flower Accent */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-palette-sand/40 text-xl sm:text-2xl font-bold select-none">
          ✿
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 sm:gap-6 text-center md:text-left">
          {/* Emoji Badge */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-palette-white/15 border border-white/20 p-2 shrink-0 flex items-center justify-center text-4xl sm:text-5xl shadow-sm">
            {archetype.emoji}
          </div>

          <div className="flex-1">
            <div className="inline-block text-[11px] sm:text-xs font-extrabold px-3 py-0.5 sm:py-1 rounded-full bg-palette-sand text-palette-slate mb-1.5 sm:mb-2">
              {archetype.tag}
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1.5 sm:mb-2">
              {archetype.name}
            </h2>
            <p className="text-xs sm:text-sm font-bold text-palette-sand leading-relaxed">
              {cliffhanger.tagline}
            </p>
          </div>

          {/* Score Box */}
          <div className="bg-palette-white/10 border border-white/20 rounded-2xl p-3 sm:p-4 text-center shrink-0 min-w-[100px] sm:min-w-[110px]">
            <div className="text-[9px] sm:text-[10px] font-bold text-palette-cream/70 uppercase tracking-wider mb-0.5 sm:mb-1">
              Interest Index
            </div>
            <div className="text-2xl sm:text-3xl font-black text-palette-sand">
              {totalScore}
              <span className="text-xs text-palette-cream/60 font-normal"> /100</span>
            </div>
          </div>
        </div>

        <p className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/15 text-xs sm:text-sm text-palette-cream/90 leading-relaxed font-medium">
          {cliffhanger.subSummary}
        </p>
      </motion.div>

      {/* 4 Dimension Scores Matrix (Updated Names) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 mb-6 sm:mb-8">
        {/* Attraction: Lilac */}
        <div className="bg-palette-lilac rounded-2xl p-3 sm:p-4 shadow-xs border border-palette-slate/10">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[11px] sm:text-xs font-bold text-palette-slate flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-palette-coral" />
              Attraction
            </span>
            <span className="text-xs sm:text-sm font-black text-palette-slate">{scores.attraction}</span>
          </div>
          <div className="w-full bg-palette-white/60 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-palette-coral rounded-full" style={{ width: `${scores.attraction}%` }} />
          </div>
          <span className="text-[9px] sm:text-[10px] text-palette-slate/75 mt-1 block font-semibold">Natural Spark</span>
        </div>

        {/* Time & Effort: Slate */}
        <div className="bg-palette-slate text-white rounded-2xl p-3 sm:p-4 shadow-xs">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[11px] sm:text-xs font-bold text-palette-cream flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-palette-sand" />
              Time & Effort
            </span>
            <span className="text-xs sm:text-sm font-black text-palette-sand">{scores.investment}</span>
          </div>
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-palette-sand rounded-full" style={{ width: `${scores.investment}%` }} />
          </div>
          <span className="text-[9px] sm:text-[10px] text-palette-cream/70 mt-1 block font-medium">Real Investment</span>
        </div>

        {/* Commitment Intent: Sage Green */}
        <div className="bg-palette-sage text-white rounded-2xl p-3 sm:p-4 shadow-xs">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[11px] sm:text-xs font-bold text-white flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-palette-cream" />
              Commitment
            </span>
            <span className="text-xs sm:text-sm font-black text-white">{scores.commitment}</span>
          </div>
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: `${scores.commitment}%` }} />
          </div>
          <span className="text-[9px] sm:text-[10px] text-palette-cream/80 mt-1 block font-medium">DTR Readiness</span>
        </div>

        {/* Exclusive Focus: Sand */}
        <div className="bg-palette-sand rounded-2xl p-3 sm:p-4 shadow-xs border border-palette-slate/10">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[11px] sm:text-xs font-bold text-palette-slate flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-palette-coral" />
              Exclusivity
            </span>
            <span className="text-xs sm:text-sm font-black text-palette-slate">{scores.exclusivity}</span>
          </div>
          <div className="w-full bg-palette-white/60 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-palette-coral rounded-full" style={{ width: `${scores.exclusivity}%` }} />
          </div>
          <span className="text-[9px] sm:text-[10px] text-palette-slate/75 mt-1 block font-semibold">Roster & Focus</span>
        </div>
      </div>

      {/* Dynamic Dichotomy Cliffhanger Box */}
      <div className="bg-palette-white border border-palette-slate/15 rounded-3xl p-5 sm:p-7 mb-6 sm:mb-8 shadow-soft-flat">
        {/* Attraction vs Commitment Dual-Track Comparison Meter */}
        <div className="bg-palette-cream/60 rounded-2xl p-4 sm:p-5 border border-palette-slate/10 mb-5 sm:mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs sm:text-sm font-extrabold text-palette-slate">
              Behavioral Disconnect Comparison
            </span>
            <span className="text-[11px] sm:text-xs font-black text-white px-2.5 py-0.5 rounded-lg bg-palette-slate shrink-0">
              Gap = {Math.abs(gap)} pts
            </span>
          </div>

          <div className="space-y-2.5">
            {/* Natural Attraction Track */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-palette-coral flex items-center gap-1.5 font-extrabold">
                  <span className="w-2 h-2 rounded-full bg-palette-coral inline-block" />
                  Natural Attraction
                </span>
                <span className="text-palette-slate font-black">{scores.attraction} / 100</span>
              </div>
              <div className="w-full bg-palette-white h-2 sm:h-2.5 rounded-full overflow-hidden border border-palette-slate/10">
                <div
                  className="h-full bg-palette-coral rounded-full transition-all duration-500"
                  style={{ width: `${scores.attraction}%` }}
                />
              </div>
            </div>

            {/* Commitment Intent Track */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-palette-slate flex items-center gap-1.5 font-extrabold">
                  <span className="w-2 h-2 rounded-full bg-palette-slate inline-block" />
                  Commitment Intent
                </span>
                <span className="text-palette-slate font-black">{scores.commitment} / 100</span>
              </div>
              <div className="w-full bg-palette-white h-2 sm:h-2.5 rounded-full overflow-hidden border border-palette-slate/10">
                <div
                  className="h-full bg-palette-slate rounded-full transition-all duration-500"
                  style={{ width: `${scores.commitment}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* The Cliffhanger Hook Header */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-palette-coral/10 text-palette-coral text-[11px] font-extrabold mb-2.5">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>CRITICAL BEHAVIORAL DISCONNECT DETECTED</span>
          </div>
          <h3 className="font-black text-palette-slate text-base sm:text-lg md:text-xl leading-snug">
            {cliffhanger.headline}
          </h3>
          <p className="text-xs sm:text-sm text-palette-slate/75 mt-1.5 font-medium leading-relaxed">
            {cliffhanger.lead}
          </p>
        </div>

        {/* The Two Divergent Paths (Dichotomy) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div className="rounded-2xl p-3.5 sm:p-4 bg-palette-lilac/30 border border-palette-slate/10">
            <span className="font-extrabold text-xs sm:text-sm text-palette-slate block mb-1">
              {cliffhanger.optionA.title}
            </span>
            <p className="text-[11px] sm:text-xs text-palette-slate/70 font-medium leading-relaxed">
              {cliffhanger.optionA.description}
            </p>
          </div>

          <div className="rounded-2xl p-3.5 sm:p-4 bg-palette-coral/10 border border-palette-coral/20">
            <span className="font-extrabold text-xs sm:text-sm text-palette-coral block mb-1">
              {cliffhanger.optionB.title}
            </span>
            <p className="text-[11px] sm:text-xs text-palette-slate/70 font-medium leading-relaxed">
              {cliffhanger.optionB.description}
            </p>
          </div>
        </div>

        {/* Evidence Teaser Hook (Curiosity transition without duplicate $3.99 button) */}
        <div className="bg-palette-slate text-white rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-palette-coral/20 border border-palette-coral/30 flex items-center justify-center text-palette-coral shrink-0 font-black text-base">
            ?
          </div>
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-bold text-palette-sand">
              {cliffhanger.evidenceTeaser}
            </p>
            <p className="text-sm sm:text-base font-black text-white mt-0.5 flex items-center gap-1.5">
              <span>🔒</span>
              <span>{cliffhanger.lockQuestion}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Paywall / Unlocked Deep Report Container */}
      {!isUnlocked ? (
        <div className="bg-palette-white border border-palette-slate/20 rounded-3xl p-5 sm:p-7 mb-6 sm:mb-8 shadow-soft-flat">
          <div className="flex items-center justify-between mb-2 sm:mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-palette-coral/15 flex items-center justify-center text-palette-coral">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-black text-palette-slate">
                {cliffhanger.modal.offerTitle}
              </h3>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-palette-slate bg-palette-lilac/50 px-2.5 py-1 rounded-full border border-palette-slate/15 shrink-0">
              Instant Access · $3.99
            </span>
          </div>

          <p className="text-xs sm:text-sm text-palette-slate/75 font-medium mb-4 sm:mb-5 leading-relaxed">
            Your answers already point toward one. Unlock the evidence + your next move.
          </p>

          {/* Key Unlocked Deliverables */}
          <div className="space-y-2.5 mb-5 sm:mb-6">
            {cliffhanger.modal.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-palette-cream/40 border border-palette-slate/10 text-xs sm:text-sm font-semibold text-palette-slate">
                <div className="w-5 h-5 rounded-full bg-palette-slate text-palette-sand flex items-center justify-center text-[11px] shrink-0 font-black mt-0.5">
                  ✓
                </div>
                <span className="leading-snug">{bullet}</span>
              </div>
            ))}
          </div>

          {/* Big Unlock Button */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setIsPaywallOpen(true)}
              className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl bg-palette-coral text-white font-extrabold text-sm sm:text-base shadow-soft-coral flex items-center justify-center gap-2.5 sm:gap-3 mx-auto cursor-pointer border border-palette-coral"
            >
              <Unlock className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{cliffhanger.modal.cta}</span>
            </motion.button>

            <p className="mt-2.5 text-[10px] sm:text-[11px] text-palette-slate/65 font-semibold flex items-center justify-center gap-2">
              <span>One-time payment · Instant access · 100% Confidential</span>
            </p>
          </div>
        </div>
      ) : (
        /* UNLOCKED FULL REPORT VIEW */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5 sm:space-y-6 mb-6 sm:mb-8"
        >
          {/* Header Unlocked Banner */}
          <div className="bg-palette-sage text-white rounded-3xl p-5 sm:p-6 text-center shadow-soft-flat">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-palette-slate text-xs font-extrabold mb-2">
              <CheckCircle2 className="w-4 h-4 text-palette-sage" />
              REPORT UNLOCKED
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white">
              《{archetype.name}》Deep Blueprint & Action Guide
            </h3>
            <p className="text-xs text-palette-cream/80 font-medium mt-1">
              Full behavioral breakdown & psychological analysis
            </p>
          </div>

          {/* Definitive Path Verdict Card */}
          <div className="bg-palette-slate text-white rounded-3xl p-5 sm:p-7 md:p-8 shadow-soft-flat border-2 border-palette-coral/40 relative overflow-hidden">
            {/* Top Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-palette-sand text-palette-slate text-xs font-black tracking-wide">
                <span>🎯</span>
                <span>THE DEFINITIVE VERDICT</span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-palette-cream/70">
                Determined by your score pattern
              </span>
            </div>

            {/* Verdict Path Title */}
            <div className="mb-3.5 sm:mb-4">
              <span className="text-[11px] sm:text-xs font-extrabold text-palette-sand block uppercase tracking-wider mb-1">
                Your Confirmed Dynamic
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
                {pathVerdict.pathTitle}
              </h3>
            </div>

            {/* Verdict Summary */}
            <p className="text-xs sm:text-sm md:text-base text-palette-cream/95 leading-relaxed font-medium mb-5 pb-5 border-b border-white/15">
              {pathVerdict.verdictSummary}
            </p>

            {/* 2 Critical Behavioral Signals */}
            <div className="mb-5">
              <h4 className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-palette-sand mb-2.5 flex items-center gap-1.5">
                <span>🔍</span>
                <span>2 CRITICAL BEHAVIORAL SIGNALS IN YOUR TEST</span>
              </h4>
              <div className="space-y-2.5">
                {pathVerdict.signals.map((signal, sIdx) => (
                  <div
                    key={sIdx}
                    className="bg-white/10 rounded-2xl p-3 sm:p-3.5 border border-white/15 text-xs sm:text-sm font-medium text-white flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-palette-coral text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span className="leading-relaxed text-palette-cream/95">{signal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Immediate Action Directive */}
            <div className="bg-palette-coral/20 border border-palette-coral/40 rounded-2xl p-4 sm:p-4.5">
              <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-palette-coral mb-1 flex items-center gap-1.5">
                <span>⚡</span>
                <span>IMMEDIATE STRATEGIC DIRECTIVE</span>
              </h4>
              <p className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                {pathVerdict.actionRecommendation}
              </p>
            </div>
          </div>

          {/* Core Hook Block */}
          <div className="bg-palette-white rounded-3xl p-5 sm:p-6 shadow-xs border border-palette-slate/15">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-palette-coral mb-2">
              EXECUTIVE DIAGNOSIS
            </h4>
            <p className="text-xs sm:text-sm md:text-base font-extrabold text-palette-slate leading-relaxed">
              {report.hook}
            </p>

            <div className="mt-3.5 sm:mt-4 pt-3.5 sm:pt-4 border-t border-palette-slate/10 space-y-2">
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
            <div key={secIdx} className="bg-palette-white rounded-3xl p-5 sm:p-6 shadow-xs border border-palette-slate/15">
              <div className="inline-block text-[10px] sm:text-[11px] font-extrabold px-2.5 sm:px-3 py-0.5 rounded-full bg-palette-lilac/40 text-palette-slate mb-2">
                {sec.tag}
              </div>
              <h4 className="font-extrabold text-sm sm:text-base md:text-lg text-palette-slate mb-2.5 sm:mb-3">
                {sec.title}
              </h4>

              <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-palette-slate/80 leading-relaxed font-medium">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {sec.bullets && sec.bullets.length > 0 && (
                <div className="mt-3.5 sm:mt-4 pt-3.5 sm:pt-4 border-t border-palette-slate/10 space-y-2">
                  {sec.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="bg-palette-cream/60 p-2.5 sm:p-3 rounded-2xl border border-palette-slate/10 text-xs font-semibold text-palette-slate flex items-start gap-2.5">
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
          <div className="bg-palette-slate text-white rounded-3xl p-5 sm:p-8 shadow-soft-flat">
            <h4 className="text-[11px] sm:text-xs font-extrabold tracking-widest uppercase text-palette-sand mb-2.5 sm:mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-palette-coral" />
              THE BOTTOM LINE
            </h4>

            <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-palette-cream/90 leading-relaxed font-medium">
              {report.bottomLine.map((line, lIdx) => (
                <p key={lIdx}>{line}</p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* mixedsigns Social Share Card Preview */}
      <ShareCard result={result} />

      {/* Share / Restart Actions */}
      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-palette-white border border-palette-slate/20 hover:bg-palette-lilac/30 text-palette-slate font-extrabold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
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
        archetypeId={archetype.id}
        modalContent={cliffhanger.modal}
      />
    </div>
  );
};
