'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CelestialArt } from './CelestialArt';

interface QuizLandingProps {
  onStart: () => void;
}

export const QuizLanding: React.FC<QuizLandingProps> = ({ onStart }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-zinc-800 bg-zinc-950 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
          <span className="text-white">☉</span>
          <span>CO-STAR ALGORITHM · 8 BEHAVIORAL QUESTIONS</span>
        </div>
      </motion.div>

      {/* Main Hero Card (Co-Star Line Art Box) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="costar-box-white p-6 md:p-12 text-center relative overflow-hidden mb-8 corner-ticks"
      >
        {/* Background Celestial Line Art */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
          <CelestialArt size={360} />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-5xl font-black tracking-tight text-white mb-6 uppercase leading-tight font-sans">
          Is he actually into you,
          <span className="block mt-2 font-mono font-normal text-zinc-300 text-xl md:text-3xl tracking-wider">
            OR ARE YOU JUST DELULU?
          </span>
        </h1>

        <div className="w-16 h-[1px] bg-white/40 mx-auto mb-6" />

        <p className="font-mono text-xs md:text-sm text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed tracking-wide">
          Stop over-analyzing his 2 AM texts in the group chat. We measure his raw behavior—his effort, availability, and roster status—to tell you the cold, cosmic truth.
        </p>

        {/* 4 Core Dimensions Line-Art Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 max-w-2xl mx-auto">
          <div className="border border-zinc-800 bg-zinc-950/80 p-4 text-left font-mono">
            <div className="text-xs text-zinc-500 mb-1">01 // ATTRACT</div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Raw Attraction</div>
            <div className="text-[10px] text-zinc-500 mt-1">Subconscious Spark</div>
          </div>

          <div className="border border-zinc-800 bg-zinc-950/80 p-4 text-left font-mono">
            <div className="text-xs text-zinc-500 mb-1">02 // EFFORT</div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Real Effort</div>
            <div className="text-[10px] text-zinc-500 mt-1">Action vs Words</div>
          </div>

          <div className="border border-zinc-800 bg-zinc-950/80 p-4 text-left font-mono">
            <div className="text-xs text-zinc-500 mb-1">03 // DTR</div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Commitment</div>
            <div className="text-[10px] text-zinc-500 mt-1">Status Intent</div>
          </div>

          <div className="border border-zinc-800 bg-zinc-950/80 p-4 text-left font-mono">
            <div className="text-xs text-zinc-500 mb-1">04 // BOUNDARY</div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Exclusivity</div>
            <div className="text-[10px] text-zinc-500 mt-1">Roster Check</div>
          </div>
        </div>

        {/* Big High-Contrast Start Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full sm:w-auto px-10 py-4 bg-white text-black font-mono font-bold text-sm tracking-[0.2em] uppercase hover:bg-zinc-200 transition-all border border-white cursor-pointer shadow-lg"
        >
          [ BEGIN DIAGNOSIS (8 Qs · 60s) → ]
        </motion.button>

        {/* Guarantee text */}
        <div className="mt-6 flex items-center justify-center gap-4 font-mono text-[11px] text-zinc-500 tracking-wider">
          <span>~60 SECONDS</span>
          <span>•</span>
          <span>100% ANONYMOUS</span>
          <span>•</span>
          <span>FREE REPORT</span>
        </div>
      </motion.div>

      {/* Feature Highlights Line-Art Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-zinc-800 bg-zinc-950 p-5 corner-ticks">
          <div className="font-mono text-xs text-zinc-500 mb-2">[ 01 ]</div>
          <h3 className="font-mono font-bold text-white text-xs uppercase tracking-wider mb-2">NO CHEAP TALK</h3>
          <p className="font-sans text-xs text-zinc-400 leading-relaxed">
            We ignore sweet words and zero-effort flirts. We analyze real receipts and behavioral patterns.
          </p>
        </div>

        <div className="border border-zinc-800 bg-zinc-950 p-5 corner-ticks">
          <div className="font-mono text-xs text-zinc-500 mb-2">[ 02 ]</div>
          <h3 className="font-mono font-bold text-white text-xs uppercase tracking-wider mb-2">EXPOSE DELULU GAP</h3>
          <p className="font-sans text-xs text-zinc-400 leading-relaxed">
            Uncover why he flirts like a boyfriend but avoids defining the relationship.
          </p>
        </div>

        <div className="border border-zinc-800 bg-zinc-950 p-5 corner-ticks">
          <div className="font-mono text-xs text-zinc-500 mb-2">[ 03 ]</div>
          <h3 className="font-mono font-bold text-white text-xs uppercase tracking-wider mb-2">7-DAY PLAYBOOK</h3>
          <p className="font-sans text-xs text-zinc-400 leading-relaxed">
            No fluff. Get hyper-specific moves to test his intent and reclaim your main-character energy.
          </p>
        </div>
      </div>
    </div>
  );
};
