'use client';
import { ModalContent } from '../utils/cliffhangers';
interface Props {
    isOpen: boolean;
    onClose: () => void;
    onUnlockSuccess?: () => void;
    archetypeName: string;
    archetypeId?: string;
    modalContent?: ModalContent;
}
export function PaywallModal({ isOpen, onClose }: Props) { if (!isOpen)
    return null; return <div role="dialog" aria-modal="true" aria-label="Action plan" className="notice"><p>Your action plan is available in your result.</p><button onClick={onClose} className="primary-button">Back to my result</button></div>; }
