'use client';
import { DualMode } from '../../types/dual';
export function DualInviteScreen({ onAnswerAsPartner2 }: {
    mode: DualMode;
    onSimulatePartner2?: () => void;
    onAnswerAsPartner2: () => void;
}) { return <div className="handoff-card"><span className="handoff-flower">✿</span><p className="eyebrow">PERSON 1 IS ALL SET</p><h1>Over to<br /><span className="hero-serif">your person.</span></h1><p>Your answers are hidden. Hand over this device so Person 2 can answer independently.</p><div className="notice">Both sets of answers will appear together only after the second person finishes.</div><button className="primary-button" onClick={onAnswerAsPartner2}>I’m Person 2 — Let’s go →</button></div>; }
