'use client';
import Link from 'next/link';
import { BrandFlower } from './BrandFlower';
import { Footer } from '../Footer';
export function QuizShell({ children, mode = 'solo' }: {
    children: React.ReactNode;
    mode?: 'solo' | 'duo' | 'friend';
}) {
    return <div className="design-system min-h-screen flex flex-col"><a href="#main" className="skip-link" onClick={event => {
        const main = document.getElementById('main');
        if (!main) return;
        // Keep the report's URL fragment when focusing its main content.
        event.preventDefault();
        main.focus({preventScroll:true});
        main.scrollIntoView();
    }}>Skip to content</a><header className="site-header"><div className="site-nav"><a href="/" className="brand" aria-label="mixedsigns home"><BrandFlower className="brand-flower" size={24}/>mixedsigns<span className="brand-caption">a little more clarity.</span></a><nav aria-label="Choose a test" className="mode-nav"><a aria-current={mode === 'solo' ? 'page' : undefined} href="/">Solo</a><Link aria-current={mode === 'friend' ? 'page' : undefined} href="/friend">Bestie</Link></nav></div></header><main id="main" tabIndex={-1} className="flex-1">{children}</main><Footer /></div>;
}
