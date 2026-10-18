'use client';
import { DualQuestion, DualPartnerRole } from '../../types/dual';
import { ChoiceQuestion } from '../ui/ChoiceQuestion';
export function DualQuestionView({ question, currentIndex, totalQuestions, partnerRole, selectedOptionId, onSelectOption, onNext, onBack = () => { } }: {
    question: DualQuestion;
    currentIndex: number;
    totalQuestions: number;
    partnerRole: DualPartnerRole;
    selectedOptionId?: string;
    onSelectOption: (id: string) => void;
    onNext: () => void;
    onBack?: () => void;
}) { return <ChoiceQuestion title={question.title} subtitle="Choose your own perspective. Your partner’s answers stay hidden until you both finish." options={question.options} selected={selectedOptionId || ''} onChange={onSelectOption} onNext={onNext} onBack={onBack} index={currentIndex} total={totalQuestions} eyebrow={(partnerRole === 'partner1' ? 'PERSON 1' : 'PERSON 2') + ' · ' + question.category.toUpperCase()} nextLabel={currentIndex === totalQuestions - 1 ? 'Finish my answers' : 'Continue'}/>; }
