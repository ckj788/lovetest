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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-palette-slate/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="soft-card p-6 md:p-8 max-w-lg w-full relative border border-palette-slate/15 overflow-hidden bg-palette-white shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-palette-slate/60 hover:text-palette-slate hover:bg-palette-lilac/30 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-palette-coral/10 text-palette-coral text-xs font-extrabold mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>UNLOCK DEEP BLUEPRINT</span>
          </div>

          <h3 className="text-2xl font-black text-palette-slate mb-1">
            See Through His Real Intentions
          </h3>
          <p className="text-xs text-palette-slate/70 mb-6 font-medium">
            Custom deep analysis & 7-day power playbook for <span className="font-bold text-palette-coral">{archetypeName}</span>
          </p>

          {/* Pricing Options Cards (Updated to $3.99) */}
          <div className="space-y-3 mb-6">
            <div
              onClick={() => setSelectedPlan('basic')}
              className={`cursor-pointer rounded-2xl p-4 border transition-all flex items-center justify-between ${
                selectedPlan === 'basic'
                  ? 'border-palette-slate bg-palette-lilac/40 shadow-xs'
                  : 'border-palette-slate/15 bg-palette-cream/40 hover:border-palette-slate/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPlan === 'basic' ? 'border-palette-slate bg-palette-slate text-white' : 'border-palette-slate/30'}`}>
                  {selectedPlan === 'basic' && <Check className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-palette-slate text-sm md:text-base">Standard Unlock</span>
                    <span className="text-[10px] bg-palette-coral text-white px-2 py-0.5 rounded-full font-bold">Limited Offer</span>
                  </div>
                  <p className="text-xs text-palette-slate/70 font-medium">Full report + 7-Day Power Playbook</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-palette-slate">$3.99</div>
                <div className="text-[10px] text-palette-slate/50 line-through">$19.99</div>
              </div>
            </div>

            <div
              onClick={() => setSelectedPlan('pro')}
              className={`cursor-pointer rounded-2xl p-4 border transition-all flex items-center justify-between ${
                selectedPlan === 'pro'
                  ? 'border-palette-slate bg-palette-slate text-white shadow-xs'
                  : 'border-palette-slate/15 bg-palette-cream/40 hover:border-palette-slate/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPlan === 'pro' ? 'border-palette-coral bg-palette-coral text-white' : 'border-palette-slate/30'}`}>
                  {selectedPlan === 'pro' && <Check className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-extrabold text-sm md:text-base ${selectedPlan === 'pro' ? 'text-white' : 'text-palette-slate'}`}>PRO Master Blueprint</span>
                    <span className="text-[10px] bg-palette-sand text-palette-slate px-2 py-0.5 rounded-full font-bold">Best Value</span>
                  </div>
                  <p className={`text-xs font-medium ${selectedPlan === 'pro' ? 'text-palette-cream/80' : 'text-palette-slate/70'}`}>
                    Standard + Texting Scripts & Roster Audit
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xl font-black ${selectedPlan === 'pro' ? 'text-palette-sand' : 'text-palette-coral'}`}>$7.99</div>
                <div className={`text-[10px] line-through ${selectedPlan === 'pro' ? 'text-palette-cream/50' : 'text-palette-slate/50'}`}>$39.99</div>
              </div>
            </div>
          </div>

          {/* Unlocked Benefits List */}
          <div className="bg-palette-cream/60 rounded-2xl p-4 mb-6 border border-palette-slate/10">
            <h4 className="text-xs font-bold text-palette-slate mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-palette-coral" />
              Includes Instant Access To:
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs text-palette-slate/80 font-medium">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-palette-sage shrink-0" />
                <span>Why he flirts but avoids DTR</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-palette-sage shrink-0" />
                <span>Real Intent vs Free Trial</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-palette-sage shrink-0" />
                <span>Stealth Roster Audit</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-palette-sage shrink-0" />
                <span>7-Day Power Playbook</span>
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSimulatedPay}
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-palette-coral text-white font-extrabold text-base shadow-soft-coral flex items-center justify-center gap-2 hover:opacity-95 transition-all cursor-pointer border border-palette-coral"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 animate-spin" />
                Generating Access Key...
              </span>
            ) : (
              <span>Unlock Report ({selectedPlan === 'basic' ? '$3.99' : '$7.99'})</span>
            )}
          </button>

          {/* Sandbox note */}
          <p className="mt-3 text-[11px] text-center text-palette-slate/60 flex items-center justify-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-palette-sage" />
            <span>Demo Mode: Click to simulate instant checkout & unlock report</span>
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
