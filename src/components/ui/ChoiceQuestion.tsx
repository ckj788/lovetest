'use client';
import { useEffect, useRef } from 'react';
export interface Choice {
    id: string;
    label: string;
}
export function ChoiceQuestion({ title, subtitle, options, selected, onChange, onNext, onBack, index, total, eyebrow, multi = false, nextLabel = 'Continue' }: {
    title: string;
    subtitle?: string;
    options: Choice[];
    selected: string | string[];
    onChange: (id: string) => void;
    onNext: () => void;
    onBack: () => void;
    index: number;
    total: number;
    eyebrow?: string;
    multi?: boolean;
    nextLabel?: string;
}) {
    const heading = useRef<HTMLLegendElement>(null);
    useEffect(() => { heading.current?.focus(); }, [title]);
    const hasSelection = Array.isArray(selected) ? selected.length > 0 : !!selected;
    return <div className="question-wrap"><div className="question-progress"><span>{eyebrow || 'YOUR SITUATION'}</span><span>{index + 1} <span className="muted">/ {total}</span></span></div><div className="progress-track" role="progressbar" aria-label="Quiz progress" aria-valuenow={index + 1} aria-valuemin={0} aria-valuemax={total}><div style={{ width: ((index + 1) / total * 100) + '%' }}/></div><form onSubmit={e => { e.preventDefault(); if (hasSelection)
        onNext(); }} className="question-card"><fieldset><legend ref={heading} tabIndex={-1} className="question-title">{title}</legend><p className="question-helper">{subtitle || 'Think about the last 30 days, or your last 5 meaningful interactions.'}</p><div className="choice-list">{options.map((option, i) => { const checked = Array.isArray(selected) ? selected.includes(option.id) : selected === option.id; return <label className={'choice ' + (checked ? 'selected' : '')} key={option.id}><input type={multi ? 'checkbox' : 'radio'} name="answer" value={option.id} checked={checked} onChange={() => onChange(option.id)}/><span className="choice-letter" aria-hidden="true">{String.fromCharCode(65 + i)}</span><span className="choice-copy">{option.label}</span><span className="choice-check" aria-hidden="true">{checked ? '✓' : ''}</span></label>; })}</div></fieldset><div className="question-actions"><button type="button" className="text-button" onClick={onBack}>← Back</button><span className="selection-note">{multi ? 'Select all that apply' : 'Choose one answer'}</span><button type="submit" className="primary-button" disabled={!hasSelection}>{nextLabel} <span aria-hidden="true">→</span></button></div></form><p className="below-note">No perfect answers. Choose what happened most often.</p></div>;
}
