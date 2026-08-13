'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, ShieldCheck, Heart, Activity, Compass, Lock } from 'lucide-react';

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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-palette-lilac/40 border border-palette-slate/15 text-palette-slate text-xs font-bold shadow-xs">
          <span className="text-palette-coral text-sm">✿</span>
          <span>VIRAL RELATIONSHIP ALGORITHM · 8 QUESTIONS</span>
        </div>
      </motion.div>

      {/* Main Hero Card (Soft Flat Style) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="soft-card p-6 md:p-10 text-center relative overflow-hidden mb-8 bg-palette-white"
      >
        {/* Flower Accent Badge top right */}
        <div className="absolute top-6 right-6 text-palette-lilac font-bold text-xl select-none">
          ✿
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-black text-palette-slate tracking-tight mb-4 leading-tight">
          Is he actually into you,
          <span className="block mt-2 text-palette-coral">
            or are you just delulu?
          </span>
        </h1>

        <p className="text-base md:text-lg text-palette-slate/80 max-w-xl mx-auto mb-8 leading-relaxed font-medium">
          Stop over-analyzing his 2 AM texts in the group chat. We measure his real behavior—his effort, availability, and roster energy—to tell you the cold, cosmic truth.
        </p>

        {/* 4 Core Dimensions Cards (Palette Colors from User Image) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8 max-w-2xl mx-auto text-left">
          {/* Dimension 1: Lilac */}
          <div className="bg-palette-lilac rounded-2xl p-4 relative shadow-sm border border-palette-slate/10">
            <div className="absolute top-3 right-3 text-palette-slate/40 text-xs">✿</div>
            <div className="w-8 h-8 rounded-xl bg-palette-white flex items-center justify-center text-palette-coral mb-2 shadow-xs">
              <Heart className="w-4 h-4" />
            </div>
            <div className="text-xs font-black text-palette-slate">Raw Attraction</div>
            <div className="text-[10px] text-palette-slate/75 font-medium mt-0.5">Subconscious Spark</div>
          </div>

          {/* Dimension 2: Slate Dark */}
          <div className="bg-palette-slate rounded-2xl p-4 relative shadow-sm text-white">
            <div className="absolute top-3 right-3 text-palette-cream/40 text-xs">✿</div>
            <div className="w-8 h-8 rounded-xl bg-palette-white/15 flex items-center justify-center text-palette-cream mb-2">
              <Activity className="w-4 h-4" />
            </div>
            <div className="text-xs font-black text-white">Real Effort</div>
            <div className="text-[10px] text-palette-cream/70 font-medium mt-0.5">Action vs Words</div>
          </div>

          {/* Dimension 3: Sage Green */}
          <div className="bg-palette-sage rounded-2xl p-4 relative shadow-sm text-white">
            <div className="absolute top-3 right-3 text-palette-cream/40 text-xs">✿</div>
            <div className="w-8 h-8 rounded-xl bg-palette-white/20 flex items-center justify-center text-white mb-2">
              <Compass className="w-4 h-4" />
            </div>
            <div className="text-xs font-black text-white">Commitment</div>
            <div className="text-[10px] text-palette-cream/80 font-medium mt-0.5">DTR Willingness</div>
          </div>

          {/* Dimension 4: Sand Orange */}
          <div className="bg-palette-sand rounded-2xl p-4 relative shadow-sm border border-palette-slate/10">
            <div className="absolute top-3 right-3 text-palette-coral/50 text-xs">✿</div>
            <div className="w-8 h-8 rounded-xl bg-palette-white flex items-center justify-center text-palette-coral mb-2 shadow-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div className="text-xs font-black text-palette-slate">Exclusivity</div>
            <div className="text-[10px] text-palette-slate/75 font-medium mt-0.5">Roster Status</div>
          </div>
        </div>

        {/* Tactile Coral Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-palette-coral text-white font-extrabold text-base shadow-soft-coral flex items-center justify-center gap-3 mx-auto transition-all cursor-pointer border border-palette-coral"
        >
          <span>Diagnose His Signals (8 Qs · 60s)</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        {/* Time guarantee */}
        <div className="mt-5 flex items-center justify-center gap-4 text-xs font-semibold text-palette-slate/70">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-palette-coral" />
            Takes ~60 Seconds
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-palette-sage" />
            100% Anonymous & Free
          </span>
        </div>
      </motion.div>

      {/* Feature Highlights Soft Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-palette-white border border-palette-slate/10 rounded-2xl p-5 shadow-xs relative">
          <div className="absolute top-4 right-4 text-palette-coral text-xs">✿</div>
          <div className="w-9 h-9 rounded-xl bg-palette-lilac/40 text-palette-slate flex items-center justify-center mb-3 font-extrabold text-sm">
            01
          </div>
          <h3 className="font-extrabold text-palette-slate mb-1 text-sm">No Cheap Talk</h3>
          <p className="text-xs text-palette-slate/70 leading-relaxed font-medium">
            We ignore sweet words and zero-effort flirts. We analyze real receipts and behavioral patterns.
          </p>
        </div>

        <div className="bg-palette-white border border-palette-slate/10 rounded-2xl p-5 shadow-xs relative">
          <div className="absolute top-4 right-4 text-palette-sage text-xs">✿</div>
          <div className="w-9 h-9 rounded-xl bg-palette-sand/50 text-palette-slate flex items-center justify-center mb-3 font-extrabold text-sm">
            02
          </div>
          <h3 className="font-extrabold text-palette-slate mb-1 text-sm">Expose Delulu Gap</h3>
          <p className="text-xs text-palette-slate/70 leading-relaxed font-medium">
            Uncover why he flirts like a boyfriend but avoids defining the relationship.
          </p>
        </div>

        <div className="bg-palette-white border border-palette-slate/10 rounded-2xl p-5 shadow-xs relative">
          <div className="absolute top-4 right-4 text-palette-coral text-xs">✿</div>
          <div className="w-9 h-9 rounded-xl bg-palette-sage/40 text-palette-slate flex items-center justify-center mb-3 font-extrabold text-sm">
            03
          </div>
          <h3 className="font-extrabold text-palette-slate mb-1 text-sm">7-Day Power Playbook</h3>
          <p className="text-xs text-palette-slate/70 leading-relaxed font-medium">
            No fluff. Get hyper-specific moves to test his intent and reclaim your main-character energy.
          </p>
        </div>
      </div>
    </div>
  );
};
