'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DualMode } from '../../types/dual';
import { Sparkles, MessageCircleHeart, HeartHandshake, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface DualLandingProps {
  selectedMode: DualMode;
  onSelectMode: (mode: DualMode) => void;
  onStart: () => void;
}

export const DualLanding: React.FC<DualLandingProps> = ({
  selectedMode,
  onSelectMode,
  onStart,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      {/* Top Pill */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-palette-lilac/40 text-palette-slate text-xs font-black mb-3 border border-palette-slate/15">
          <Sparkles className="w-3.5 h-3.5 text-palette-coral" />
          <span>2-PERSON BACK-TO-BACK DIAGNOSIS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-palette-slate tracking-tight leading-tight">
          The Dual Blind Alignment Test
        </h1>
        <p className="mt-3 text-xs sm:text-sm md:text-base text-palette-slate/80 font-medium leading-relaxed max-w-lg mx-auto">
          Both of you answer in secret. Neither sees the other's responses until both are finished. Uncover silent agreements and unspoken gaps.
        </p>
      </motion.div>

      {/* Mode Selection Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4 mb-8"
      >
        <div className="text-center mb-2">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-palette-coral">
            Step 1 · Choose Your Current Dynamic
          </span>
        </div>

        {/* Card 1: Talking Stage */}
        <div
          onClick={() => onSelectMode('talking_stage')}
          className={`cursor-pointer rounded-3xl p-5 sm:p-6 transition-all border-2 relative select-none ${
            selectedMode === 'talking_stage'
              ? 'bg-palette-white border-palette-slate shadow-soft-flat ring-2 ring-palette-coral/30'
              : 'bg-palette-cream/40 border-palette-slate/15 hover:border-palette-slate/30 opacity-80'
          }`}
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-palette-lilac/40 flex items-center justify-center text-xl shrink-0">
                💬
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-palette-coral px-2 py-0.5 rounded bg-palette-coral/10 inline-block mb-0.5">
                  Pre-Commitment / Situationship
                </span>
                <h3 className="text-base sm:text-lg font-black text-palette-slate">
                  The Talking Stage Alignment
                </h3>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
              selectedMode === 'talking_stage'
                ? 'border-palette-slate bg-palette-slate text-palette-sand'
                : 'border-palette-slate/30'
            }`}>
              {selectedMode === 'talking_stage' && <span className="text-xs">✓</span>}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-palette-slate/80 font-medium leading-relaxed mb-3">
            For when things feel close but undefined. Test intentions, exclusivity timelines, and see if you're both building toward the same future.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] sm:text-xs text-palette-slate/75 font-semibold pt-3 border-t border-palette-slate/10">
            <div className="flex items-center gap-1.5">
              <span className="text-palette-sage">✓</span>
              <span>Compares exclusivity expectations</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-palette-sage">✓</span>
              <span>Reveals timeline for going official</span>
            </div>
          </div>
        </div>

        {/* Card 2: Committed Couples */}
        <div
          onClick={() => onSelectMode('couples')}
          className={`cursor-pointer rounded-3xl p-5 sm:p-6 transition-all border-2 relative select-none ${
            selectedMode === 'couples'
              ? 'bg-palette-white border-palette-slate shadow-soft-flat ring-2 ring-palette-coral/30'
              : 'bg-palette-cream/40 border-palette-slate/15 hover:border-palette-slate/30 opacity-80'
          }`}
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-palette-sand/40 flex items-center justify-center text-xl shrink-0">
                💍
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-palette-sage px-2 py-0.5 rounded bg-palette-sage/10 inline-block mb-0.5">
                  Official / Committed Couple
                </span>
                <h3 className="text-base sm:text-lg font-black text-palette-slate">
                  Couples Depth & Chemistry Check
                </h3>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
              selectedMode === 'couples'
                ? 'border-palette-slate bg-palette-slate text-palette-sand'
                : 'border-palette-slate/30'
            }`}>
              {selectedMode === 'couples' && <span className="text-xs">✓</span>}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-palette-slate/80 font-medium leading-relaxed mb-3">
            For couples already together. Unpack secret emotional needs, resolve subtle roommate ruts, and compare your 12-month shared life vision.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] sm:text-xs text-palette-slate/75 font-semibold pt-3 border-t border-palette-slate/10">
            <div className="flex items-center gap-1.5">
              <span className="text-palette-sage">✓</span>
              <span>Uncovers secret unmet wishes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-palette-sage">✓</span>
              <span>Aligns conflict de-escalation styles</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* How it Works / Trust points */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-palette-slate text-white rounded-3xl p-5 sm:p-6 mb-8 shadow-soft-flat"
      >
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-5 h-5 text-palette-sand" />
          <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-palette-sand">
            How The Blind Match Works
          </h4>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-2 sm:p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-base sm:text-lg font-black text-palette-sand mb-1">1</div>
            <p className="text-[11px] sm:text-xs font-extrabold text-white leading-tight mb-0.5">You Answer</p>
            <p className="text-[10px] text-palette-cream/70">6 quick questions in total secrecy</p>
          </div>
          <div className="p-2 sm:p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-base sm:text-lg font-black text-palette-sand mb-1">2</div>
            <p className="text-[11px] sm:text-xs font-extrabold text-white leading-tight mb-0.5">Send Link</p>
            <p className="text-[10px] text-palette-cream/70">They answer without seeing your choices</p>
          </div>
          <div className="p-2 sm:p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-base sm:text-lg font-black text-palette-coral mb-1">3</div>
            <p className="text-[11px] sm:text-xs font-extrabold text-white leading-tight mb-0.5">Reveal Matrix</p>
            <p className="text-[10px] text-palette-cream/70">Unlock side-by-side answers together</p>
          </div>
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <button
          onClick={onStart}
          className="w-full sm:w-auto px-10 py-4.5 rounded-2xl bg-palette-coral hover:bg-palette-coral/90 text-white font-black text-sm sm:text-base shadow-soft-flat transition-all cursor-pointer inline-flex items-center justify-center gap-2.5 active:scale-98"
        >
          <span>Start as Partner 1 (Takes 2 Mins)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="mt-2.5 text-[11px] text-palette-slate/60 font-semibold">
          100% Confidential · Your partner cannot peek at your answers early
        </p>
      </motion.div>
    </div>
  );
};
