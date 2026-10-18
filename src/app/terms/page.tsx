import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, AlertCircle } from 'lucide-react';

export default function TermsPage() {
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
            <BookOpen className="w-3.5 h-3.5 text-[#E07A5F]" /> Terms of Service
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#504E76]">Terms of Service</h1>
          <p className="text-sm text-[#504E76]/70">Effective date: October 2026</p>
        </header>

        <div className="bg-white/80 backdrop-blur-sm border border-[#504E76]/15 rounded-2xl p-6 sm:p-8 space-y-6 text-sm leading-relaxed text-[#504E76]/90 shadow-sm">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#504E76] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#E07A5F]" /> Nature of the Service & Medical Disclaimer
            </h2>
            <p>
              mixedsigns is an educational self-reflection and communication tool designed to help individuals and partners
              examine relationship behaviors and communication patterns.
            </p>
            <p className="font-semibold text-[#E07A5F]">
              mixedsigns does NOT provide psychological therapy, psychiatric evaluation, clinical diagnosis, or legal advice.
            </p>
            <p>
              If you are experiencing relationship distress involving physical danger, domestic abuse, or severe mental crisis,
              please reach out to local professional resources and crisis support hotlines immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#504E76]">One-Time Purchases & Access</h2>
            <p>
              All purchases on mixedsigns are <strong>one-time payments</strong> granting access to the specific digital report
              or duo blueprint purchased. There are no recurring subscriptions or hidden recurring charges.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#504E76]">Acceptable Use</h2>
            <p>
              You agree not to use our service to harass, deceive, or coerce any other individual.
              When inviting a partner or friend to a 2-person test, participation must be completely voluntary.
            </p>
          </section>

          <section className="pt-4 border-t border-[#504E76]/10 text-xs text-[#504E76]/70">
            For questions regarding these Terms, please reach out via our{' '}
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
