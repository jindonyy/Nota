'use client';

import { queryKeys } from '@/constants/queryKeys';
import { Chat } from '@/models/chat';
import { clientFetch } from '@/modules';
import { Data } from '@/types/data';
import { useSuspenseQuery } from '@tanstack/react-query';

export type GetChatsResponse = Data<Chat[]>;

export const clientGetChats = (init?: RequestInit) => {
    const result = useSuspenseQuery({
        queryKey: [queryKeys.getChats],
        queryFn: async () => await clientFetch<GetChatsResponse>('/chats', init),
    });

    return result;
};

export type GetChatResponse = Data<Chat>;

export const clientGetChat = (chatId: string, init?: RequestInit) => {
    const result = useSuspenseQuery({
        queryKey: [queryKeys.getChat, chatId],
        queryFn: async () => await clientFetch<GetChatResponse>(`/chats/${chatId}`, init),
    });

    return result;
};
