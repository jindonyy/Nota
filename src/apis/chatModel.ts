import { serverFetch } from '@/modules';

export type ChatModel = {
    chat_model_id: string;
    chat_model_name: string;
};
export type ChatModels = {
    data: ChatModel[];
};

export const serverGetChatModels = async (init?: RequestInit) => {
    const data = await serverFetch<ChatModels>('/chat_model', init);
    return data;
};
