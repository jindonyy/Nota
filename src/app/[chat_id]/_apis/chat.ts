'use client';

import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import type { Chat } from '@/app/[chat_id]/_models';
import { queryKeys } from '@/constants/queryKeys';
import { clientFetch } from '@/modules';
import type { Data } from '@/types/data';

export type GetChatsResponse = Data<Chat[]>;

export const useGetChats = (init?: RequestInit) => {
    const result = useSuspenseQuery({
        queryKey: [queryKeys.getChats],
        queryFn: async () => await clientFetch<GetChatsResponse>('/chats', init),
    });

    return result;
};

export type GetChatResponse = Data<Chat>;

export const useGetChat = (chatId: string, init?: RequestInit) => {
    const result = useSuspenseQuery({
        queryKey: [queryKeys.getChat, chatId],
        queryFn: async () => await clientFetch<GetChatResponse>(`/chats/${chatId}`, init),
    });

    return result;
};
export type PostDialoguesRequest = { prompt: string };
export type PostDialoguesResponse = Data<Chat>;

export const usePostChat = (chatId: string) => {
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
