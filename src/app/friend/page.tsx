'use client';
import { useState } from 'react';
import Link from 'next/link';
import { QuizShell } from '../../components/ui/QuizShell';
import { SafeShareCard } from '../../components/ui/SafeShareCard';
import { ChoiceQuestion } from '../../components/ui/ChoiceQuestion';
import { FRIEND_QUESTIONS, calculateFriendResult } from '../../data/dualQuestions';
import { trackEvent } from '../../lib/analytics';
export default function FriendPage() {
    const [step, setStep] = useState<'landing' | 'quiz' | 'handoff' | 'result'>('landing'), [role, setRole] = useState(1), [index, setIndex] = useState(0), [guess, setGuess] = useState(false), [p1, setP1] = useState<Record<number, string>>({}), [p2, setP2] = useState<Record<number, string>>({}), [g1, setG1] = useState<Record<number, string>>({}), [g2, setG2] = useState<Record<number, string>>({});
    const q = FRIEND_QUESTIONS[index], current = role === 1 ? (guess ? g1 : p1) : (guess ? g2 : p2);
    const choose = (id: string) => { if (role === 1) {
        if (guess)
            setG1({ ...g1, [q.id]: id });
        else
            setP1({ ...p1, [q.id]: id });
    }
    else {
        if (guess)
            setG2({ ...g2, [q.id]: id });
        else
            setP2({ ...p2, [q.id]: id });
    } };
    const next = () => { if (!guess)
        setGuess(true);
    else {
        setGuess(false);
        if (index < 7)
            setIndex(index + 1);
        else if (role === 1)
            setStep('handoff');
        else {
            setStep('result');
            trackEvent('friend_result_viewed', { mode: 'friend' });
        }
    } window.scrollTo({ top: 0, behavior: 'instant' }); };
    const back = () => { if (guess)
        setGuess(false);
    else if (index > 0) {
        setIndex(index - 1);
        setGuess(true);
    }
    else
        setStep(role === 1 ? 'landing' : 'handoff'); };
    const reset = () => { setStep('landing'); setIndex(0); setGuess(false); setRole(1); setP1({}); setP2({}); setG1({}); setG2({}); };
    const result = step === 'result' ? calculateFriendResult(p1, g1, p2, g2) : null;
    return <QuizShell mode="friend">{step === 'landing' && <div className="duo-landing bestie-landing"><span className="bestie-flower" aria-hidden="true">✳</span><p className="eyebrow">8 QUESTIONS · TWO PERSPECTIVES · FREE</p><h1>Same braincell.<br /><span className="hero-serif">Or new lore?</span></h1><p className="duo-intro">How well do you actually know each other?<br />Answer for yourself. Guess your bestie. Compare the plot twists.</p><div className="bestie-how"><div><span>01</span><h2>Your answer</h2><p>Choose your own preference.</p></div><div><span>02</span><h2>Your guess</h2><p>Predict what your friend will choose.</p></div><div><span>03</span><h2>The reveal</h2><p>See what you knew—and what you didn’t.</p></div></div><div className="notice">Take turns on one device. Person 1 answers and guesses, then Person 2 does the same. Both sets stay hidden in the interface until you finish. Cross-device invites aren’t connected in this preview.</div><button className="primary-button hero-cta" onClick={() => { setStep('quiz'); trackEvent('quiz_started', { mode: 'friend' }); }}>Test Your Bestie — Free <span>↗</span></button></div>}{step === 'quiz' && <><ChoiceQuestion title={q.title} subtitle={guess ? 'Now guess your friend’s preference. You won’t see their actual answer until you both finish.' : 'First, answer for yourself. There is no right preference.'} options={q.options} selected={current[q.id] || ''} onChange={choose} onNext={next} onBack={back} index={index * 2 + (guess ? 1 : 0)} total={16} eyebrow={'PERSON ' + role + ' · ' + (guess ? 'GUESS YOUR BESTIE' : 'YOUR OWN ANSWER')} nextLabel={!guess ? 'Now guess theirs' : index === 7 ? 'Finish my round' : 'Next question'}/><p className="below-note"><button className="text-button" onClick={reset}>Clear answers & start again</button></p></>}{step === 'handoff' && <div className="handoff-card"><span className="handoff-flower">✳</span><p className="eyebrow">YOUR GUESSES ARE IN</p><h1>Pass it to<br /><span className="hero-serif">your bestie.</span></h1><p>No peeking. Person 2 now answers for themselves and guesses your preferences.</p><button className="primary-button" onClick={() => { setRole(2); setIndex(0); setGuess(false); setStep('quiz'); }}>I’m Person 2 — My turn →</button></div>}{result && <div className="result-wrap"><section className="result-hero"><span className="result-emoji">✳</span><p className="eyebrow">YOUR BESTIE ENERGY</p><h1>{result.name}</h1><p className="result-tagline">Knowing each other and being alike are two different things.</p><p className="small-copy">A playful snapshot of eight preferences. Not a measure of friendship quality.</p></section><div className="bestie-scores"><article className="insight-card lilac"><span className="eyebrow">FRIENDSHIP ALIGNMENT</span><strong>{result.agreement}<small> / 8</small></strong><h2>Same answers</h2><p>{result.alignment}% of your own preferences matched. Different tastes can still make a great friendship.</p></article><article className="insight-card cream"><span className="eyebrow">MIND-READER SCORE</span><strong>{result.correct1 + result.correct2}<small> / 16</small></strong><h2>Correct guesses</h2><p>Person 1 guessed {result.correct1}/8. Person 2 guessed {result.correct2}/8. These are two independent guess scores.</p></article></div><section className="today-card"><span className="eyebrow">YOUR FRIENDSHIP CHALLENGE</span><h2>Plan one thing that fits both of your preferences.</h2><p>{result.difference ? 'Start with your different answers to “' + result.difference.category + '”. Each person gets to explain the story behind their choice.' : 'You matched on every question. Each person pick one answer and explain something the other might not know about it.'}</p></section><section className="report-section"><div className="report-heading"><p className="eyebrow">THE NEW LORE</p><h2>You really didn’t know this?</h2><p>All eight reveals. A correct guess means you predicted their choice—not that you shared it.</p></div>{FRIEND_QUESTIONS.map(q => <article className="comparison-card" key={q.id}><span className="eyebrow">{q.category}{result.shared?.id === q.id ? ' · A SHARED PREFERENCE' : ''}{result.difference?.id === q.id ? ' · YOUR FIRST PLOT TWIST' : ''}</span><h3>{q.title}</h3><div className="partner-columns">{[{ person: 1, own: p1[q.id], guessed: g2[q.id] }, { person: 2, own: p2[q.id], guessed: g1[q.id] }].map(item => <div key={item.person}><span>PERSON {item.person} CHOSE</span><p>{q.options.find(o => o.id === item.own)?.label}</p><p className="guess-reveal">Person {item.person === 1 ? 2 : 1} guessed: {q.options.find(o => o.id === item.guessed)?.label}<strong>{item.guessed === item.own ? ' ✓ Got it' : ' ↗ New lore'}</strong></p></div>)}</div></article>)}</section><SafeShareCard title={result.name} symbol="✳" mode="friend" caption={result.correct1 + result.correct2 + ' / 16 correct guesses · ' + result.agreement + ' / 8 shared preferences'} path="/friend"/><div className="result-end"><p>Untangling a different kind of connection?</p><Link href="/?ref=bestie-result" className="secondary-button">Try the Solo reflection →</Link><button className="text-button" onClick={reset}>Clear answers & play again</button></div></div>}</QuizShell>;
}
