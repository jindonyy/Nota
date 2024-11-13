import { create } from 'zustand';

interface ChatStore {
    promptValue: string;
    updatePromptValue(value: string): void;
    resetPromptValue(): void;
}

export const useChatStore = create<ChatStore>((set) => ({
    promptValue: '',
    updatePromptValue: (value: string) => set(() => ({ promptValue: value })),
    resetPromptValue: () => set(() => ({ promptValue: '' })),
}));
