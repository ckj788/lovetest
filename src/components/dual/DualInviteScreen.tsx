'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DualMode } from '../../types/dual';
import { Lock, Copy, Check, Share2, Smartphone, Play, Sparkles } from 'lucide-react';

interface DualInviteScreenProps {
  mode: DualMode;
  onSimulatePartner2: () => void;
  onAnswerAsPartner2: () => void;
}

export const DualInviteScreen: React.FC<DualInviteScreenProps> = ({
  mode,
  onSimulatePartner2,
  onAnswerAsPartner2,
}) => {
  const [copied, setCopied] = useState(false);

  const inviteUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/dual?partner=2&mode=${mode}`
    : 'https://mixedsigns.com/dual?partner=2';

  const shareText = mode === 'talking_stage'
    ? "I just took our Blind Alignment test on mixedsigns 🤫 Take your side (2 mins) so we can unlock our compatibility breakdown:"
    : "I just completed our Couples Depth & Love Language test on mixedsigns! Your turn (2 mins) so we can see our side-by-side results 💕:";

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText}\n${inviteUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="w-16 h-16 rounded-3xl bg-palette-sage/20 text-palette-sage flex items-center justify-center text-3xl mx-auto mb-3 shadow-sm">
          🔒
        </div>
        <div className="inline-block text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-palette-slate text-palette-sand mb-2">
          PARTNER 1 COMPLETE · ANSWERS SEALED
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-palette-slate leading-tight">
          Now Send The Key To Partner 2
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-palette-slate/75 font-medium leading-relaxed max-w-md mx-auto">
          Your answers are locked in secret. They won't see what you chose until both of you complete the test.
        </p>
      </motion.div>

      {/* Share Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-palette-white rounded-3xl p-5 sm:p-6 border border-palette-slate/15 shadow-soft-flat mb-6"
      >
        <div className="text-[11px] font-black uppercase tracking-wider text-palette-coral mb-2">
          Your Secret Invitation Link
        </div>

        <div className="bg-palette-cream/40 rounded-2xl p-3 border border-palette-slate/10 flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono font-bold text-palette-slate/70 truncate">
            {inviteUrl}
          </span>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl bg-palette-slate text-white text-xs font-bold shrink-0 hover:bg-palette-slate/90 transition-all flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-palette-sand" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-palette-lilac/25 border border-palette-slate/10 text-xs text-palette-slate/85 font-medium italic mb-4">
          “{shareText}”
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            onClick={handleCopy}
            className="w-full py-3 px-4 rounded-xl bg-palette-coral hover:bg-palette-coral/90 text-white font-extrabold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Copy & Send via iMessage / WhatsApp</span>
          </button>

          <button
            onClick={onAnswerAsPartner2}
            className="w-full py-3 px-4 rounded-xl bg-palette-slate text-white font-extrabold text-xs hover:bg-palette-slate/90 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Smartphone className="w-4 h-4" />
            <span>Pass Phone to Partner 2 Now</span>
          </button>
        </div>
      </motion.div>

      {/* Simulator Card for Testing/Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-palette-sand/20 border-2 border-dashed border-palette-slate/25 rounded-3xl p-5 text-center"
      >
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-palette-slate text-palette-sand text-[10px] font-black mb-2">
          <Sparkles className="w-3 h-3 text-palette-coral" />
          <span>DEVELOPER & LIVE PREVIEW TOOL</span>
        </div>
        <h4 className="text-sm font-black text-palette-slate mb-1">
          Testing Alone Right Now?
        </h4>
        <p className="text-[11px] sm:text-xs text-palette-slate/75 font-medium leading-relaxed mb-3.5 max-w-sm mx-auto">
          Simulate Partner 2 answering right now with realistic data, so you can immediately see the Dual Results & Paywall!
        </p>
        <button
          onClick={onSimulatePartner2}
          className="px-6 py-2.5 rounded-xl bg-palette-slate hover:bg-palette-slate/90 text-palette-sand font-black text-xs shadow-soft-flat transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <Play className="w-3.5 h-3.5 text-palette-coral" />
          <span>Simulate Partner 2 & Reveal Match</span>
        </button>
      </motion.div>
    </div>
  );
};
