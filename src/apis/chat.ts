'use client';

import { queryKeys } from '@/constants/queryKeys';
import { Chat } from '@/models/chat';
import { clientFetch } from '@/modules';
import { Data } from '@/types/data';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

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
export type PostDialoguesRequest = { prompt: string };
export type PostDialoguesResponse = Data<Chat>;

export const clientPostChat = (chatId: string) => {
    const result = useMutation({
        mutationFn: (request: PostDialoguesRequest) =>
            clientFetch(`/chats/${chatId}/dialogues`, {
                method: 'POST',
                body: JSON.stringify(request),
            }),
        gcTime: 0,
    });

    return result;
};
