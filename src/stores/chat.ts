import { create } from 'zustand';

interface ChatStore {
    promptValue: string;
    updatePromptValue(value: string): void;
    resetPromptValue(): void;
    isNewChatFetching: boolean;
    startNewChatFetching(): void;
    endNewChatFetching(): void;
}

export const useChatStore = create<ChatStore>((set) => ({
    promptValue: '',
    updatePromptValue: (value: string) => set(() => ({ promptValue: value })),
    resetPromptValue: () => set(() => ({ promptValue: '' })),
    isNewChatFetching: false,
    startNewChatFetching: () => set(() => ({ isNewChatFetching: true })),
    endNewChatFetching: () => set(() => ({ isNewChatFetching: false })),
}));
