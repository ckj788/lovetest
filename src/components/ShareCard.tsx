'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizResultData } from '../types/quiz';
import { Download, Heart, Activity, Compass, Lock, Loader2, X, Sparkles } from 'lucide-react';
import { toPng, toBlob } from 'html-to-image';

interface ShareCardProps {
  result: QuizResultData;
}

export const ShareCard: React.FC<ShareCardProps> = ({ result }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImgUrl, setGeneratedImgUrl] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const { archetype, totalScore, scores } = result;

  // High-Resolution Image Export & Native Mobile Share/Download
  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);

    try {
      // 1. Render card to high-DPI data URL & blob
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: '#FFFFFF',
      });
      setGeneratedImgUrl(dataUrl);

      const blob = await toBlob(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: '#FFFFFF',
      });

      // 2. Try Native Mobile Web Share API (iOS / Android System Sheet)
      let sharedNatively = false;
      if (blob && typeof navigator !== 'undefined' && navigator.share) {
        const file = new File([blob], `mixedsigns-${archetype.id}.png`, { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: `${archetype.name} · mixedsigns Report`,
              text: `My mixedsigns Diagnosis: ${archetype.name} (${archetype.report.socialQuote})`,
            });
            sharedNatively = true;
          } catch (shareErr) {
            console.log('Share canceled or not supported, falling back to modal:', shareErr);
          }
        }
      }

      // 3. If not shared natively, trigger direct browser download & show preview modal
      if (!sharedNatively) {
        const link = document.createElement('a');
        link.download = `mixedsigns-${archetype.id}.png`;
        link.href = dataUrl;
        link.click();
        setShowImageModal(true);
      }
    } catch (err) {
      console.error('Failed to generate image:', err);
      if (cardRef.current) {
        try {
          const fallbackUrl = await toPng(cardRef.current, { pixelRatio: 2 });
          setGeneratedImgUrl(fallbackUrl);
          setShowImageModal(true);
        } catch (e) {
          console.error(e);
        }
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="my-6 sm:my-8">
      {/* Social Card Preview Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        ref={cardRef}
        className="soft-card p-5 sm:p-7 md:p-8 bg-palette-white border-2 border-palette-slate/15 relative overflow-hidden shadow-soft-flat max-w-lg mx-auto"
      >
        {/* Top Header - Spacious & Clean */}
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-palette-slate/10 gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-6 h-6 rounded-lg bg-palette-slate text-palette-cream flex items-center justify-center font-bold text-xs shrink-0">
              ✿
            </span>
            <span className="font-black text-xs sm:text-sm tracking-wider uppercase text-palette-slate truncate">
              MIXEDSIGNS
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-palette-lilac/50 text-palette-slate border border-palette-slate/15 shrink-0">
            OFFICIAL REPORT
          </span>
        </div>

        {/* Archetype Hero Box */}
        <div className="bg-palette-cream/75 rounded-3xl p-4 sm:p-5 mb-4 sm:mb-5 border border-palette-slate/10 relative text-center">
          <div className="absolute top-3.5 right-3.5 text-palette-coral text-xs sm:text-sm">✿</div>
          
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-palette-white flex items-center justify-center text-3xl sm:text-4xl mx-auto mb-2 shadow-xs border border-palette-slate/10">
            {archetype.emoji}
          </div>

          <div className="inline-block text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-palette-sand text-palette-slate mb-1">
            {archetype.tag}
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-palette-slate">
            {archetype.name}
          </h3>

          <p className="text-[11px] sm:text-xs text-palette-slate/75 font-medium mt-1 max-w-xs mx-auto">
            {archetype.report.shareSummary}
          </p>
        </div>

        {/* Core Golden Quote Box (High Sharability) */}
        <div className="bg-palette-slate text-white rounded-2xl p-3.5 sm:p-4 mb-4 sm:mb-5 shadow-xs relative">
          <div className="text-palette-sand text-base sm:text-lg font-serif leading-none mb-0.5">“</div>
          <p className="text-xs sm:text-sm font-bold leading-relaxed text-palette-cream italic px-1">
            {archetype.report.socialQuote}
          </p>
          <div className="text-right text-palette-sand text-base sm:text-lg font-serif leading-none mt-0.5">”</div>
        </div>

        {/* 4 Dimension Bar Snapshot */}
        <div className="grid grid-cols-2 gap-2 mb-4 sm:mb-5 text-[10px] sm:text-[11px] font-bold text-palette-slate">
          <div className="bg-palette-lilac/40 p-2 sm:p-2.5 rounded-xl border border-palette-slate/10 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Heart className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-palette-coral" />
              Attraction
            </span>
            <span className="font-black text-palette-coral">{scores.attraction}%</span>
          </div>

          <div className="bg-palette-sand/40 p-2 sm:p-2.5 rounded-xl border border-palette-slate/10 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Activity className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-palette-slate" />
              Time & Effort
            </span>
            <span className="font-black text-palette-slate">{scores.investment}%</span>
          </div>

          <div className="bg-palette-sage/30 p-2 sm:p-2.5 rounded-xl border border-palette-slate/10 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Compass className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-palette-sage" />
              Commitment
            </span>
            <span className="font-black text-palette-slate">{scores.commitment}%</span>
          </div>

          <div className="bg-palette-cream p-2 sm:p-2.5 rounded-xl border border-palette-slate/10 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Lock className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-palette-coral" />
              Exclusivity
            </span>
            <span className="font-black text-palette-coral">{scores.exclusivity}%</span>
          </div>
        </div>

        {/* Score & Stamp */}
        <div className="flex items-center justify-between pt-3 border-t border-palette-slate/10 text-xs">
          <div>
            <span className="text-[9px] sm:text-[10px] text-palette-slate/60 font-bold uppercase block">Overall Match</span>
            <span className="text-sm sm:text-base font-black text-palette-coral">{totalScore} <span className="text-[10px] text-palette-slate/50 font-normal">/100</span></span>
          </div>
          <div className="text-right">
            <span className="text-[9px] sm:text-[10px] text-palette-slate/60 font-bold uppercase block">Algorithm Verified</span>
            <span className="text-[11px] sm:text-xs font-mono font-extrabold text-palette-slate lowercase">#mixedsigns</span>
          </div>
        </div>
      </motion.div>

      {/* Save HD Card Button (Single Primary Mobile CTA) */}
      <div className="mt-4 max-w-lg mx-auto">
        <button
          onClick={handleDownloadImage}
          disabled={isGenerating}
          className="w-full py-4 px-6 rounded-2xl bg-palette-coral text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-soft-coral hover:opacity-95 transition-all cursor-pointer border border-palette-coral disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating HD Story Card...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Save HD Card (Mobile)</span>
            </>
          )}
        </button>
      </div>

      {/* Mobile Long-Press / Save Modal */}
      <AnimatePresence>
        {showImageModal && generatedImgUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-palette-slate/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-palette-white rounded-3xl p-5 max-w-md w-full relative shadow-2xl border border-palette-slate/15 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-palette-slate/70 hover:text-palette-slate hover:bg-palette-lilac/30 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-palette-coral/10 text-palette-coral text-xs font-extrabold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CARD READY TO SHARE</span>
                </div>
                <h4 className="text-base font-black text-palette-slate">
                  Your High-Res Story Card
                </h4>
                <p className="text-xs text-palette-slate/70 font-medium mt-1">
                  📱 On mobile: Long-press the image to <span className="font-bold text-palette-coral">"Save to Photos"</span> or share directly to Instagram!
                </p>
              </div>

              {/* Generated Image Container */}
              <div className="rounded-2xl overflow-hidden border border-palette-slate/15 shadow-sm mb-4 bg-palette-cream/40 p-2">
                <img
                  src={generatedImgUrl}
                  alt="mixedsigns Report Card"
                  className="w-full h-auto rounded-xl object-contain"
                />
              </div>

              <div className="flex gap-2">
                <a
                  href={generatedImgUrl}
                  download={`mixedsigns-${archetype.id}.png`}
                  className="flex-1 py-3 rounded-xl bg-palette-coral text-white font-extrabold text-xs text-center shadow-soft-coral border border-palette-coral"
                >
                  Direct Download PNG
                </a>
                <button
                  onClick={() => setShowImageModal(false)}
                  className="px-5 py-3 rounded-xl bg-palette-slate/10 hover:bg-palette-slate/20 text-palette-slate font-bold text-xs"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
