import type { ChatModels } from '@/models';
import { serverFetch } from '@/modules';

export const serverGetChatModels = async (init?: RequestInit) => {
    const data = await serverFetch<ChatModels>('/chat_model', init);
    return data;
};
