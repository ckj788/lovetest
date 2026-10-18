import React from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function RefundsPage() {
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
            <RefreshCw className="w-3.5 h-3.5 text-[#E07A5F]" /> Refund Policy
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#504E76]">Clear & Fair Refund Policy</h1>
          <p className="text-sm text-[#504E76]/70">Simple, honest satisfaction guarantee</p>
        </header>

        <div className="bg-white/80 backdrop-blur-sm border border-[#504E76]/15 rounded-2xl p-6 sm:p-8 space-y-6 text-sm leading-relaxed text-[#504E76]/90 shadow-sm">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#504E76] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E07A5F]" /> 14-Day Satisfaction Guarantee
            </h2>
            <p>
              We want mixedsigns to genuinely provide clarity and practical next steps for your situation.
              If you purchased a report or Duo blueprint and believe the content did not provide meaningful value,
              or if you experienced a technical issue that prevented access, you are eligible for a full refund within
              <strong> 14 days</strong> of purchase.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#504E76]">How to Request a Refund</h2>
            <p>
              Simply email our support team at <strong>support@mixedsigns.com</strong> with:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>The email address used during Stripe checkout</li>
              <li>Your Stripe Checkout receipt number or approximate purchase date/time</li>
              <li>A brief note explaining why the report didn’t meet your expectations (helps us improve)</li>
            </ul>
            <p className="text-xs text-[#504E76]/70">
              Refunds are processed via Stripe back to your original payment method within 3–5 business days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#504E76]">Restoring Previous Purchases</h2>
            <p>
              If you paid for a report but cleared your browser cache or switched devices, you do not need to buy it again.
              Contact us with your checkout email, and we will issue a direct restore link for your report.
            </p>
          </section>

          <section className="pt-4 border-t border-[#504E76]/10 text-xs text-[#504E76]/70">
            Have questions? Reach us via our{' '}
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
