'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Check, Sparkles, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import posthog from 'posthog-js';
import { ModalContent } from '../utils/cliffhangers';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockSuccess?: () => void;
  archetypeName: string;
  archetypeId?: string;
  modalContent?: ModalContent;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  onUnlockSuccess,
  archetypeName,
  archetypeId,
  modalContent,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const headline = modalContent?.headline || "So... Are They Actually Going to Commit?";
  const subtitle = modalContent?.subtitle || "You already know the attraction is there. Your answers reveal whether this looks like a slow burn — or a connection they're comfortable keeping undefined.";
  const offerTitle = modalContent?.offerTitle || "Find Out What's Really Keeping This Stuck";
  const bullets = modalContent?.bullets || [
    "The 2 signals revealing their real intentions",
    "What would prove they're ready to commit",
    "Exactly what to do over the next 7 days",
    "What to say next — without chasing or forcing “the talk”"
  ];
  const ctaText = modalContent?.cta || "Show Me What To Do Next — $3.99";

  // Track paywall view and reset processing state
  useEffect(() => {
    setIsProcessing(false);

    if (isOpen) {
      posthog.capture('paywall_viewed', {
        archetype: archetypeName,
        archetypeId,
      });
    }

    const handlePageShow = () => {
      setIsProcessing(false);
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [isOpen, archetypeName, archetypeId]);

  if (!isOpen) return null;

  const handleStripeCheckout = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    posthog.capture('checkout_clicked', {
      archetype: archetypeName,
      archetypeId,
      price: 3.99,
    });

    // Safety timeout: reset processing state after 6s in case redirect is canceled or delayed
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 6000);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          archetypeName,
          archetypeId,
        }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        clearTimeout(timer);
        setIsProcessing(false);
        alert(data.error || 'Unable to connect to Stripe checkout. Please try again.');
      }
    } catch (err: any) {
      clearTimeout(timer);
      console.error('Stripe redirect error:', err);
      setIsProcessing(false);
      alert(err.message || 'Unable to connect to Stripe checkout. Please check your connection.');
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
            onClick={() => {
              setIsProcessing(false);
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full text-palette-slate/60 hover:text-palette-slate hover:bg-palette-lilac/30 transition-all cursor-pointer"
            title="Close to view free summary"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-palette-coral/10 text-palette-coral text-xs font-extrabold mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>DIAGNOSIS FOR {archetypeName.toUpperCase()}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-palette-slate mb-2 leading-tight">
            {headline}
          </h3>
          <p className="text-xs sm:text-[13px] text-palette-slate/75 mb-5 font-medium leading-relaxed">
            {subtitle}
          </p>

          {/* Offer Card */}
          <div className="rounded-2xl p-4 sm:p-5 border-2 border-palette-slate bg-palette-lilac/35 shadow-xs mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-palette-slate text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-palette-slate text-sm sm:text-base block">
                  {offerTitle}
                </span>
                <p className="text-[11px] sm:text-xs text-palette-slate/70 font-medium mt-0.5">
                  Instant unlock on all devices · 100% Confidential
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-black text-palette-slate">$3.99</div>
            </div>
          </div>

          {/* Unlocked Benefits List */}
          <div className="bg-palette-cream/60 rounded-2xl p-3.5 sm:p-4 mb-4 border border-palette-slate/10 text-left">
            <h4 className="text-xs font-bold text-palette-slate mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-palette-coral" />
              <span>Includes Instant Access To:</span>
            </h4>
            <ul className="space-y-2 text-[11px] sm:text-xs text-palette-slate/85 font-medium">
              {bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-palette-sage shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Button: Show Me What To Do Next — $3.99 */}
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
              <span>{ctaText}</span>
            )}
          </button>

          {/* Micro-trust line */}
          <div className="mt-2.5 text-center text-[10px] sm:text-[11px] text-palette-slate/70 font-semibold flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-palette-sage" />
            <span>One-time payment · Instant access · No subscription</span>
          </div>

          {/* Secondary Option: View Free Summary */}
          <button
            onClick={() => {
              setIsProcessing(false);
              onClose();
            }}
            className="w-full mt-2.5 py-1.5 text-xs font-bold text-palette-slate/65 hover:text-palette-slate hover:underline flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Or continue to Free Summary Report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
