'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      onUnlockSuccess();
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm font-mono">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="costar-box-white p-6 md:p-8 max-w-lg w-full relative corner-ticks shadow-2xl bg-black"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xs font-mono text-zinc-500 hover:text-white border border-zinc-800 hover:border-white px-2 py-1 transition-all"
          >
            [ ESC × ]
          </button>

          {/* Badge */}
          <div className="inline-block px-2.5 py-0.5 border border-zinc-700 text-zinc-400 text-[10px] uppercase tracking-widest mb-4">
            ☉ UNLOCK DEEP BLUEPRINT
          </div>

          <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2 font-sans">
            SEE THROUGH HIS REAL INTENTIONS
          </h3>
          <p className="text-xs text-zinc-400 mb-6">
            // CUSTOM DEEP ANALYSIS & 7-DAY PLAYBOOK FOR <span className="text-white font-bold">{archetypeName}</span>
          </p>

          {/* Pricing Options Cards */}
          <div className="space-y-3 mb-6">
            <div
              onClick={() => setSelectedPlan('basic')}
              className={`cursor-pointer p-4 border transition-all flex items-center justify-between text-xs ${
                selectedPlan === 'basic'
                  ? 'border-white bg-white text-black font-bold'
                  : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <span>{selectedPlan === 'basic' ? '[ ● ]' : '[ ○ ]'}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="uppercase tracking-wider">STANDARD UNLOCK</span>
                    <span className={`text-[9px] px-1.5 py-0.2 border ${selectedPlan === 'basic' ? 'border-black text-black' : 'border-zinc-700 text-zinc-400'}`}>POPULAR</span>
                  </div>
                  <p className={`text-[11px] font-normal ${selectedPlan === 'basic' ? 'text-zinc-800' : 'text-zinc-500'}`}>
                    Full report + 7-Day Power Playbook
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-black">$9.90</div>
                <div className={`text-[10px] line-through ${selectedPlan === 'basic' ? 'text-zinc-600' : 'text-zinc-600'}`}>$29.90</div>
              </div>
            </div>

            <div
              onClick={() => setSelectedPlan('pro')}
              className={`cursor-pointer p-4 border transition-all flex items-center justify-between text-xs ${
                selectedPlan === 'pro'
                  ? 'border-white bg-white text-black font-bold'
                  : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <span>{selectedPlan === 'pro' ? '[ ● ]' : '[ ○ ]'}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="uppercase tracking-wider">PRO MASTER BLUEPRINT</span>
                    <span className={`text-[9px] px-1.5 py-0.2 border ${selectedPlan === 'pro' ? 'border-black text-black' : 'border-zinc-700 text-zinc-400'}`}>BEST VALUE</span>
                  </div>
                  <p className={`text-[11px] font-normal ${selectedPlan === 'pro' ? 'text-zinc-800' : 'text-zinc-500'}`}>
                    Standard + Texting Scripts & Roster Audit
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-black">$19.90</div>
                <div className={`text-[10px] line-through ${selectedPlan === 'pro' ? 'text-zinc-600' : 'text-zinc-600'}`}>$49.90</div>
              </div>
            </div>
          </div>

          {/* Unlocked Benefits List */}
          <div className="border border-zinc-800 bg-zinc-950 p-4 mb-6 text-xs text-zinc-400 space-y-2">
            <div className="text-white font-bold mb-2 uppercase tracking-wider">
              ✦ INCLUDES INSTANT ACCESS TO:
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>✓ Why he flirts but avoids DTR</div>
              <div>✓ Real Intent vs Free Trial</div>
              <div>✓ Stealth Roster Audit</div>
              <div>✓ 7-Day Power Playbook</div>
            </div>
          </div>

          {/* Simulated Pay Action Button */}
          <button
            onClick={handleSimulatedPay}
            disabled={isProcessing}
            className="w-full py-4 bg-white text-black font-mono font-bold text-xs tracking-[0.2em] uppercase hover:bg-zinc-200 transition-all border border-white cursor-pointer"
          >
            {isProcessing
              ? '[ GENERATING ACCESS KEY... ]'
              : `[ UNLOCK REPORT (${selectedPlan === 'basic' ? '$9.90' : '$19.90'}) → ]`}
          </button>

          {/* Sandbox note */}
          <p className="mt-3 text-[10px] text-center text-zinc-500">
            // DEMO MODE: CLICK TO SIMULATE INSTANT UNLOCK
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
