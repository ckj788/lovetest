'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Check, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockSuccess: () => void;
  archetypeName: string;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  onUnlockSuccess,
  archetypeName,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'pro'>('basic');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSimulatedPay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // Dynamic import for confetti
      import('canvas-confetti')
        .then((confettiModule) => {
          const fireConfetti = confettiModule.default || confettiModule;
          fireConfetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        })
        .catch((e) => console.error(e));
      onUnlockSuccess();
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mbti-text/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass-card rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative border border-white overflow-hidden bg-white/95"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-mbti-muted hover:text-mbti-text hover:bg-mbti-purple/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mbti-pink/10 text-mbti-pink text-xs font-bold mb-3">
            <Lock className="w-3.5 h-3.5" />
            UNLOCK DEEP BLUEPRINT
          </div>

          <h3 className="text-2xl font-black text-mbti-text mb-1">
            See Through His Real Intentions
          </h3>
          <p className="text-xs text-mbti-muted mb-6">
            Custom deep analysis & 7-day power playbook for <span className="font-bold text-mbti-purple">{archetypeName}</span>
          </p>

          {/* Pricing Options Cards */}
          <div className="space-y-3 mb-6">
            <div
              onClick={() => setSelectedPlan('basic')}
              className={`cursor-pointer rounded-2xl p-4 border transition-all flex items-center justify-between ${
                selectedPlan === 'basic'
                  ? 'border-mbti-purple bg-mbti-purple/5 ring-2 ring-mbti-purple/20'
                  : 'border-mbti-border bg-white hover:border-mbti-purple/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPlan === 'basic' ? 'border-mbti-purple bg-mbti-purple text-white' : 'border-mbti-muted/40'}`}>
                  {selectedPlan === 'basic' && <Check className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-mbti-text text-sm md:text-base">Standard Unlock</span>
                    <span className="text-[10px] bg-mbti-pink/15 text-mbti-pink px-2 py-0.5 rounded-full font-bold">Popular</span>
                  </div>
                  <p className="text-xs text-mbti-muted">Full report + 7-Day Power Playbook</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-mbti-purple">$9.90</div>
                <div className="text-[10px] text-mbti-muted line-through">$29.90</div>
              </div>
            </div>

            <div
              onClick={() => setSelectedPlan('pro')}
              className={`cursor-pointer rounded-2xl p-4 border transition-all flex items-center justify-between ${
                selectedPlan === 'pro'
                  ? 'border-mbti-purple bg-mbti-purple/5 ring-2 ring-mbti-purple/20'
                  : 'border-mbti-border bg-white hover:border-mbti-purple/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPlan === 'pro' ? 'border-mbti-purple bg-mbti-purple text-white' : 'border-mbti-muted/40'}`}>
                  {selectedPlan === 'pro' && <Check className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-mbti-text text-sm md:text-base">PRO Master Blueprint</span>
                    <span className="text-[10px] bg-gradient-mbti text-white px-2 py-0.5 rounded-full font-bold">Best Value</span>
                  </div>
                  <p className="text-xs text-mbti-muted">Standard + Texting Scripts & Roster Audit</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-mbti-pink">$19.90</div>
                <div className="text-[10px] text-mbti-muted line-through">$49.90</div>
              </div>
            </div>
          </div>

          {/* Unlocked Benefits List */}
          <div className="bg-mbti-bg rounded-2xl p-4 mb-6 border border-mbti-border/60">
            <h4 className="text-xs font-bold text-mbti-text mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-mbti-purple" />
              Includes Instant Access To:
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs text-mbti-muted">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-mbti-teal shrink-0" />
                <span>Why he flirts but avoids DTR</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-mbti-teal shrink-0" />
                <span>Real Intent vs Free Trial</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-mbti-teal shrink-0" />
                <span>Stealth Roster Audit</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-mbti-teal shrink-0" />
                <span>7-Day Power Playbook</span>
              </li>
            </ul>
          </div>

          {/* Simulated Pay Action Button */}
          <button
            onClick={handleSimulatedPay}
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-gradient-mbti text-white font-extrabold text-base shadow-glow-purple flex items-center justify-center gap-2 hover:opacity-95 transition-all cursor-pointer"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 animate-spin" />
                Generating Access Key...
              </span>
            ) : (
              <span>Unlock Report ({selectedPlan === 'basic' ? '$9.90' : '$19.90'})</span>
            )}
          </button>

          {/* Sandbox note for dev testing */}
          <p className="mt-3 text-[11px] text-center text-mbti-muted flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-mbti-teal" />
            <span>Demo Mode: Click to simulate instant checkout & unlock report</span>
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
