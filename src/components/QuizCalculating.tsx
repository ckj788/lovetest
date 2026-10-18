'use client';
import { useEffect } from 'react';
export function QuizCalculating({ onComplete }: {
    onComplete: () => void;
}) { useEffect(() => { onComplete(); }, [onComplete]); return <p role="status" className="below-note">Organizing the behaviors you reported…</p>; }
