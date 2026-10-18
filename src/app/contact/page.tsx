import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, Clock } from 'lucide-react';

export default function ContactPage() {
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
            <Mail className="w-3.5 h-3.5 text-[#E07A5F]" /> Support & Contact
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#504E76]">Get in Touch</h1>
          <p className="text-sm text-[#504E76]/70">We are here to help with access, questions, and feedback.</p>
        </header>

        <div className="bg-white/80 backdrop-blur-sm border border-[#504E76]/15 rounded-2xl p-6 sm:p-8 space-y-6 text-sm leading-relaxed text-[#504E76]/90 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-[#504E76]/10 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#E07A5F]/15 flex items-center justify-center text-[#E07A5F]">
                <Mail className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#504E76]">Direct Email</h3>
              <p className="text-xs text-[#504E76]/75">For refund requests, access issues, and general inquiries:</p>
              <a
                href="mailto:support@mixedsigns.com"
                className="inline-block text-sm font-semibold text-[#E07A5F] hover:underline"
              >
                support@mixedsigns.com
              </a>
            </div>

            <div className="p-4 bg-white border border-[#504E76]/10 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#81B29A]/15 flex items-center justify-center text-[#81B29A]">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#504E76]">Response Time</h3>
              <p className="text-xs text-[#504E76]/75">We normally respond within 24–48 hours on business days.</p>
            </div>
          </div>

          <section className="space-y-3 pt-2">
            <h2 className="text-base font-bold text-[#504E76] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#E07A5F]" /> Common Support Topics
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-[#504E76]/80">
              <li>
                <strong>Lost your report?</strong> Include your checkout email, and we’ll re-send your direct link.
              </li>
              <li>
                <strong>Duo session link expired?</strong> Send us your session ID and we can refresh it for you.
              </li>
              <li>
                <strong>Feedback or suggestions?</strong> We actively read every message to improve our questions and guides.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
