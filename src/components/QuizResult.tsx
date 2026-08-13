'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuizResultData } from '../types/quiz';
import { PaywallModal } from './PaywallModal';
import { CelestialArt } from './CelestialArt';

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
        className="text-center mb-8 font-mono"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-zinc-800 bg-zinc-950 text-zinc-400 text-[11px] uppercase tracking-[0.2em] mb-3">
          <span className="text-white">☉</span>
          <span>CO-STAR // BEHAVIORAL DIAGNOSIS COMPLETE</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight uppercase font-sans">
          HIS SIGNAL BREAKDOWN REPORT
        </h1>
      </motion.div>

      {/* Main Archetype Card (Co-Star Editorial Line Art) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="costar-box-white p-6 md:p-10 relative overflow-hidden mb-8 corner-ticks"
      >
        {/* Background Celestial Art */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-15 pointer-events-none">
          <CelestialArt size={280} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          {/* Symbol Badge */}
          <div className="w-20 h-20 border border-white bg-black p-2 shrink-0 flex items-center justify-center font-mono text-3xl text-white">
            {archetype.emoji}
          </div>

          <div className="flex-1 font-mono">
            <div className="inline-block text-[11px] uppercase tracking-widest px-2 py-0.5 border border-zinc-700 text-zinc-400 mb-2">
              ARCHETYPE // {archetype.tag}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2 font-sans">
              {archetype.name}
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
              // {archetype.subtitle}
            </p>
          </div>

          {/* Score Box */}
          <div className="border border-zinc-700 bg-zinc-950 p-4 text-center shrink-0 min-w-[130px] font-mono">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
              INTEREST INDEX
            </div>
            <div className="text-3xl font-black text-white">
              {totalScore}
              <span className="text-xs text-zinc-500 font-normal"> /100</span>
            </div>
          </div>
        </div>

        <p className="mt-6 pt-6 border-t border-zinc-800 text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          {archetype.description}
        </p>
      </motion.div>

      {/* 4 Dimension Scores Line-Art Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8 font-mono">
        <div className="border border-zinc-800 bg-zinc-950 p-4">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-zinc-400">01 ATTR</span>
            <span className="font-bold text-white">{scores.attraction}%</span>
          </div>
          <div className="w-full bg-zinc-900 h-1">
            <div className="h-full bg-white" style={{ width: `${scores.attraction}%` }} />
          </div>
          <span className="text-[10px] text-zinc-500 mt-2 block">ATTRACTION SPARK</span>
        </div>

        <div className="border border-zinc-800 bg-zinc-950 p-4">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-zinc-400">02 EFFORT</span>
            <span className="font-bold text-white">{scores.investment}%</span>
          </div>
          <div className="w-full bg-zinc-900 h-1">
            <div className="h-full bg-white" style={{ width: `${scores.investment}%` }} />
          </div>
          <span className="text-[10px] text-zinc-500 mt-2 block">REAL TIME & EFFORT</span>
        </div>

        <div className="border border-zinc-800 bg-zinc-950 p-4">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-zinc-400">03 DTR</span>
            <span className="font-bold text-white">{scores.commitment}%</span>
          </div>
          <div className="w-full bg-zinc-900 h-1">
            <div className="h-full bg-white" style={{ width: `${scores.commitment}%` }} />
          </div>
          <span className="text-[10px] text-zinc-500 mt-2 block">STATUS INTENT</span>
        </div>

        <div className="border border-zinc-800 bg-zinc-950 p-4">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-zinc-400">04 ROSTER</span>
            <span className="font-bold text-white">{scores.exclusivity}%</span>
          </div>
          <div className="w-full bg-zinc-900 h-1">
            <div className="h-full bg-white" style={{ width: `${scores.exclusivity}%` }} />
          </div>
          <span className="text-[10px] text-zinc-500 mt-2 block">ROSTER & BOUNDARY</span>
        </div>
      </div>

      {/* Free Attraction vs Commitment Gap Box */}
      <div className="border border-zinc-700 bg-zinc-950 p-6 mb-8 corner-ticks">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-white uppercase tracking-widest">
          <span>[ CORE GAP ANALYSIS ]</span>
        </div>
        <h3 className="font-bold text-white text-base md:text-lg mb-3 font-sans">
          Attraction vs Commitment Gap
        </h3>
        <p className="text-xs md:text-sm text-zinc-400 mb-6 leading-relaxed">
          {freeSummary}
        </p>

        <div className="border border-zinc-800 bg-black p-4 font-mono">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-white">ATTRACTION: {scores.attraction}%</span>
            <span className="text-zinc-400">COMMITMENT: {scores.commitment}%</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-zinc-900 h-2 flex">
              <div className="h-full bg-white" style={{ width: `${scores.attraction}%` }} />
              <div className="h-full bg-zinc-600" style={{ width: `${scores.commitment}%` }} />
            </div>
            <span className="text-xs font-bold text-black bg-white px-2 py-0.5">
              GAP = {gap}%
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-sans">
            ✦ Cosmic Insight: {archetype.gapAnalysis}
          </p>
        </div>
      </div>

      {/* Paywall / Unlocked Deep Report Container */}
      {!isUnlocked ? (
        <div className="costar-box p-6 md:p-8 relative overflow-hidden mb-8 corner-ticks font-mono">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="text-white">🔒</span>
              <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-wider">
                LOCKED DEEP DIAGNOSIS REPORT
              </h3>
            </div>
            <span className="text-[10px] text-zinc-400 border border-zinc-700 px-2 py-0.5">
              4 SECTIONS LOCKED
            </span>
          </div>

          {/* Locked Insight Cards Preview */}
          <div className="space-y-3 mb-8">
            <div className="border border-zinc-900 bg-zinc-950/60 p-4 filter opacity-60 select-none">
              <div className="flex items-center justify-between font-bold text-xs text-white mb-1">
                <span>[ 🔒 01 ] Why does he flirt like a boyfriend but avoid the DTR?</span>
                <span>→</span>
              </div>
              <p className="text-[11px] text-zinc-600">
                He enjoys low-pressure romance without giving up single perks...
              </p>
            </div>

            <div className="border border-zinc-900 bg-zinc-950/60 p-4 filter opacity-60 select-none">
              <div className="flex items-center justify-between font-bold text-xs text-white mb-1">
                <span>[ 🔒 02 ] Is he genuine, or is he just enjoying the free trial?</span>
                <span>→</span>
              </div>
              <p className="text-[11px] text-zinc-600">
                3 behavioral receipts that reveal his real motives...
              </p>
            </div>

            <div className="border border-zinc-900 bg-zinc-950/60 p-4 filter opacity-60 select-none">
              <div className="flex items-center justify-between font-bold text-xs text-white mb-1">
                <span>[ 🔒 03 ] Stealth Roster & Social Boundaries Check</span>
                <span>→</span>
              </div>
              <p className="text-[11px] text-zinc-600">
                Analyzing his IG activity, story likes, and roster energy...
              </p>
            </div>

            <div className="border border-zinc-900 bg-zinc-950/60 p-4 filter opacity-60 select-none">
              <div className="flex items-center justify-between font-bold text-xs text-white mb-1">
                <span>[ 🔒 04 ] 7-Day Power Playbook (Should you text or pull back?)</span>
                <span>→</span>
              </div>
              <p className="text-[11px] text-zinc-600">
                4 tactical steps: Stop text firsts, match his energy, the 72h test...
              </p>
            </div>
          </div>

          {/* Big Unlock Button */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsPaywallOpen(true)}
              className="w-full sm:w-auto px-10 py-4 bg-white text-black font-mono font-bold text-sm tracking-[0.2em] uppercase hover:bg-zinc-200 transition-all border border-white cursor-pointer shadow-lg"
            >
              [ UNLOCK FULL REPORT ($9.90 TRIAL) → ]
            </motion.button>

            <p className="mt-3 text-[11px] text-zinc-500 font-mono">
              // DEMO MODE: CLICK TO PREVIEW FULL UNLOCKED REPORT INSTANTLY
            </p>
          </div>
        </div>
      ) : (
        /* UNLOCKED FULL REPORT VIEW */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 mb-8 font-mono"
        >
          <div className="border border-white bg-white text-black p-6 text-center">
            <div className="inline-block px-3 py-1 border border-black text-xs font-bold uppercase mb-2">
              ✓ REPORT UNLOCKED
            </div>
            <h3 className="text-xl md:text-2xl font-black font-sans uppercase">
              《{archetype.name}》DEEP BLUEPRINT & ACTION GUIDE
            </h3>
          </div>

          {/* Insight 1 */}
          <div className="border border-zinc-800 bg-zinc-950 p-6">
            <h4 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
              <span className="text-zinc-500">[ 01 ]</span>
              Why does he flirt like a boyfriend but avoid the DTR?
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans bg-black p-4 border border-zinc-900">
              {archetype.unlockedInsights.whyNotAdvancing}
            </p>
          </div>

          {/* Insight 2 */}
          <div className="border border-zinc-800 bg-zinc-950 p-6">
            <h4 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
              <span className="text-zinc-500">[ 02 ]</span>
              Is he genuine, or is he just enjoying the free trial?
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans bg-black p-4 border border-zinc-900">
              {archetype.unlockedInsights.seriousVsAmbiguous}
            </p>
          </div>

          {/* Insight 3 */}
          <div className="border border-zinc-800 bg-zinc-950 p-6">
            <h4 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
              <span className="text-zinc-500">[ 03 ]</span>
              Stealth Roster & Social Boundaries Analysis
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans bg-black p-4 border border-zinc-900">
              {archetype.unlockedInsights.exclusivitySignals}
            </p>
          </div>

          {/* Insight 4: Action Guide 7 Days */}
          <div className="border border-zinc-700 bg-black p-6 corner-ticks">
            <h4 className="font-bold text-sm text-white mb-4 uppercase tracking-widest">
              ✦ 7-DAY POWER PLAYBOOK (ACTION STEPS)
            </h4>

            <div className="space-y-3 font-sans">
              {archetype.unlockedInsights.actionGuide7Days.map((step, idx) => (
                <div key={idx} className="border border-zinc-800 bg-zinc-950 p-4 flex items-start gap-3">
                  <span className="font-mono text-xs text-zinc-400 font-bold shrink-0 mt-0.5">
                    DAY 0{idx + 1}
                  </span>
                  <span className="text-xs md:text-sm text-zinc-200 leading-relaxed">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Share / Restart Actions */}
      <div className="flex justify-center font-mono">
        <button
          onClick={onReset}
          className="px-8 py-3.5 border border-zinc-700 hover:border-white text-zinc-300 hover:text-white uppercase tracking-widest text-xs transition-all cursor-pointer"
        >
          [ RETAKE DIAGNOSIS ]
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
