'use client';

import type { UseMutationOptions, UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import type { Chat } from '@/app/[chat_id]/_models';
import { queryKeys } from '@/constants/queryKeys';
import { clientFetch } from '@/modules';
import type { HttpError } from '@/modules/HttpError';
import type { Data } from '@/types/data';

export type GetChatsResponse = Data<Chat[]>;

export const useGetChats = (
    options?: Omit<UseSuspenseQueryOptions<GetChatsResponse, Error, GetChatsResponse, string[]>, 'queryKey'>,
) => {
    const result = useSuspenseQuery({
        queryKey: [queryKeys.getChats],
        queryFn: async () => await clientFetch<GetChatsResponse>('/chats'),
        ...options,
    });

    return result;
};

export type GetChatResponse = Data<Chat>;

export const useGetChat = (
    chatId: string,
    options?: Omit<UseSuspenseQueryOptions<GetChatResponse, Error, GetChatResponse, string[]>, 'queryKey'>,
) => {
    const result = useSuspenseQuery({
        queryKey: [queryKeys.getChat, chatId],
        queryFn: async () => await clientFetch<GetChatResponse>(`/chats/${chatId}`),
        ...options,
    });

    return result;
};
export type PostDialoguesRequest = { prompt: string };
export type PostDialoguesResponse = Data<Chat>;

export const usePostChat = (
    chatId: string,
    options?: UseMutationOptions<PostDialoguesResponse, HttpError, PostDialoguesRequest, unknown>,
) => {
    const result = useMutation({
        mutationFn: (request: PostDialoguesRequest) =>
            clientFetch<PostDialoguesResponse>(`/chats/${chatId}/dialogues`, {
                method: 'POST',
                body: JSON.stringify(request),
            }),
        gcTime: 0,
        ...options,
    });

    return result;
};
