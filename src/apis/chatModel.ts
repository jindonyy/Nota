import { serverFetch } from '@/modules';

export type ChatModel = {
    chat_model_id: string;
    chat_model_name: string;
};
export type ChatModels = {
    data: ChatModel[];
};

export const CHAT_MODEL_API = '/chat_model';

export const serverGetChatModels = async (init?: RequestInit) => {
    const data = await serverFetch<ChatModels>(CHAT_MODEL_API, init);
    return data;
};
