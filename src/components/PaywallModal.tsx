'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Check, Sparkles, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockSuccess: () => void;
  archetypeName: string;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  archetypeName,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleStripeCheckout = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          archetypeName,
        }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to initialize checkout');
      }
    } catch (err: any) {
      console.error('Stripe redirect error:', err);
      setIsProcessing(false);
      alert(err.message || 'Unable to connect to Stripe checkout. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-palette-slate/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="soft-card p-5 sm:p-7 md:p-8 max-w-lg w-full relative border border-palette-slate/15 overflow-hidden bg-palette-white shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-palette-slate/60 hover:text-palette-slate hover:bg-palette-lilac/30 transition-all cursor-pointer"
            title="Close to view free summary"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-palette-coral/10 text-palette-coral text-xs font-extrabold mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>UNLOCK DEEP BLUEPRINT</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-palette-slate mb-1">
            See Through Their Real Intentions
          </h3>
          <p className="text-xs text-palette-slate/70 mb-5 font-medium">
            Custom deep analysis & 7-day power playbook for <span className="font-bold text-palette-coral">{archetypeName}</span>
          </p>

          {/* Single Focused Pricing Offer ($3.99) */}
          <div className="rounded-2xl p-4 sm:p-5 border-2 border-palette-slate bg-palette-lilac/35 shadow-xs mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-palette-slate text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-palette-slate text-sm sm:text-base">Full Deep Report + 7-Day Plan</span>
                  <span className="text-[10px] bg-palette-coral text-white px-2 py-0.5 rounded-full font-bold">80% OFF</span>
                </div>
                <p className="text-[11px] sm:text-xs text-palette-slate/70 font-medium mt-0.5">
                  Instant unlock on all devices · 100% Confidential
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xl sm:text-2xl font-black text-palette-slate">$3.99</div>
              <div className="text-xs text-palette-slate/50 line-through">$19.99</div>
            </div>
          </div>

          {/* Unlocked Benefits List */}
          <div className="bg-palette-cream/60 rounded-2xl p-3.5 sm:p-4 mb-5 border border-palette-slate/10">
            <h4 className="text-xs font-bold text-palette-slate mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-palette-coral" />
              Includes Instant Access To:
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-[11px] sm:text-xs text-palette-slate/80 font-medium">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-palette-sage shrink-0" />
                <span>Why they flirt but avoid DTR</span>
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

          {/* Action Button: Primary Pay ($3.99) */}
          <button
            onClick={handleStripeCheckout}
            disabled={isProcessing}
            className="w-full py-3.5 sm:py-4 rounded-2xl bg-palette-coral text-white font-extrabold text-sm sm:text-base shadow-soft-coral flex items-center justify-center gap-2 hover:opacity-95 transition-all cursor-pointer border border-palette-coral disabled:opacity-75"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 animate-spin" />
                Connecting to Stripe Checkout...
              </span>
            ) : (
              <span>Unlock Full Report ($3.99)</span>
            )}
          </button>

          {/* Secondary Option: View Free Summary */}
          <button
            onClick={onClose}
            className="w-full mt-3 py-2 text-xs font-bold text-palette-slate/65 hover:text-palette-slate hover:underline flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Or continue to Free Summary Report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Guarantee / Security note */}
          <p className="mt-2.5 text-[10px] sm:text-[11px] text-center text-palette-slate/50 flex items-center justify-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-palette-sage" />
            <span>Encrypted 256-Bit SSL · Apple Pay, Google Pay & All Major Cards</span>
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
