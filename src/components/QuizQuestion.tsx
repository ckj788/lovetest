'use client';
import { Question } from '../types/quiz';
import { ChoiceQuestion } from './ui/ChoiceQuestion';
export function QuizQuestion({ question, currentIndex, totalQuestions, selectedAnswers, onSelectOption, onNext, onPrev }: {
    question: Question;
    currentIndex: number;
    totalQuestions: number;
    selectedAnswers: string | string[];
    onSelectOption: (id: string) => void;
    onNext: () => void;
    onPrev: () => void;
}) {
    return <ChoiceQuestion title={question.title} subtitle={question.type === 'multi' ? 'Select all that apply. “Not enough opportunity” and “None” must each be selected on their own.' : 'Think about the last 30 days, or your last 5 meaningful interactions.'} options={question.options} selected={selectedAnswers} onChange={onSelectOption} onNext={onNext} onBack={onPrev} index={currentIndex} total={totalQuestions} multi={question.type === 'multi'} eyebrow={question.dimensionName?.toUpperCase()} nextLabel={currentIndex === totalQuestions - 1 ? 'See my pattern' : 'Continue'}/>;
}
