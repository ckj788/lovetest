import { QuizResultData } from './quiz';
export type FriendFull = ReturnType<typeof import('../data/friendPatterns').calculateFriendReport>;
export interface ReportView {
    storage?:'browser';
    checkoutAvailable: boolean;
    checkoutTestMode: boolean;
    checkoutUnavailableReason?: string;
    refunded?:boolean;
    mode: 'solo' | 'friend';
    role: 'owner' | 'guest';
    completed: boolean;
    paid: boolean;
    unlocked: boolean;
    price: number;
    expiresAt: number;
    inviteToken?: string;
    preview: {
        name: string;
        summary: string;
        emoji?: string;
        action?: string;
    };
    full?: QuizResultData | FriendFull;
}
