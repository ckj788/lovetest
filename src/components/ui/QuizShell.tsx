'use client';
import Link from 'next/link';
import { BrandFlower } from './BrandFlower';
import { Footer } from '../Footer';
export function QuizShell({ children, mode = 'solo' }: {
    children: React.ReactNode;
    mode?: 'solo' | 'duo' | 'friend';
}) {
    return <div className="design-system min-h-screen flex flex-col"><a href="#main" className="skip-link">Skip to content</a><header className="site-header"><div className="site-nav"><Link href="/" className="brand" aria-label="mixedsigns home"><BrandFlower className="brand-flower" size={24}/>mixedsigns<span className="brand-caption">a little more clarity.</span></Link><nav aria-label="Choose a test" className="mode-nav"><Link aria-current={mode === 'solo' ? 'page' : undefined} href="/">Solo</Link><Link aria-current={mode === 'friend' ? 'page' : undefined} href="/friend">Bestie</Link></nav></div></header><main id="main" className="flex-1">{children}</main><Footer /></div>;
}
