import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Trash2, EyeOff } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FDF8E2] text-[#504E76] font-sans selection:bg-[#E07A5F]/20 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#504E76]/70 hover:text-[#504E76] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/60 border border-[#504E76]/10 rounded-full text-xs font-semibold uppercase tracking-wider text-[#504E76]/80">
            <Shield className="w-3.5 h-3.5 text-[#E07A5F]" /> Privacy Policy
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#504E76]">Your Privacy & Data Protection</h1>
          <p className="text-sm text-[#504E76]/70">Last updated: October 2026</p>
        </header>

        <div className="bg-white/80 backdrop-blur-sm border border-[#504E76]/15 rounded-2xl p-6 sm:p-8 space-y-6 text-sm leading-relaxed text-[#504E76]/90 shadow-sm">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#504E76] flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-[#E07A5F]" /> No Names Required & Private Responses
            </h2>
            <p>
              We do not ask for your real name, phone number, social media handles, or address.
              Your answers are used strictly to calculate your behavioral pattern report and are never sold or made public.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#504E76] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#E07A5F]" /> Duo & Bestie Blind Match Visibility
            </h2>
            <p>
              In our 2-person modes (Duo and Bestie), responses are kept strictly blind and private.
              Neither partner can see the other’s answers until <strong>both people have submitted</strong> their portion.
              This preview supports taking turns on one device. The interface hides answers until both people finish; this is not an access-control guarantee against someone inspecting the browser. Cross-device invitations are not connected.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#504E76] flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-[#E07A5F]" /> Retention & Deletion
            </h2>
            <p>
              In this frontend preview, Solo progress is saved in your browser for up to 7 days from your latest activity. Use “Clear my progress” or “Clear my reflection” to remove it. Duo and Bestie answers stay in the current tab and are cleared when you leave or reload. No quiz answers are submitted to a server by these preview flows.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#504E76]">Payments & Security</h2>
            <p>
              All payments are processed securely by <strong>Stripe</strong>. We never see or store your full credit card
              details. We only receive a transaction confirmation to activate your report access.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#504E76]">Analytics & Cookies</h2>
            <p>
              We use aggregated, privacy-focused analytics (PostHog and Vercel Analytics) to monitor website performance
              and conversion rates. We never send raw test answers or personal identifiers to analytics platforms.
            </p>
          </section>

          <section className="pt-4 border-t border-[#504E76]/10 text-xs text-[#504E76]/70">
            Questions regarding our privacy practices? Visit our{' '}
            <Link href="/contact" className="underline font-semibold text-[#E07A5F]">
              Contact Page
            </Link>
            .
          </section>
        </div>
      </div>
    </div>
  );
}
