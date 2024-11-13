'use client';

import type { UseMutationOptions, UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import type { Chat } from '@/app/[chat_id]/_models';
import { queryKeys } from '@/constants/queryKeys';
import { clientFetch } from '@/modules';
import type { HttpError } from '@/modules/HttpError';
import type { Data } from '@/types/data';

// 채팅 목록 조회
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

// 단일 채팅 조회
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

// 대화 생성
export type PostDialoguesRequest = { chatId: string; prompt: string };
export type PostDialoguesResponse = Data<Chat>;

export const usePostDialogue = (
    options?: UseMutationOptions<PostDialoguesResponse, HttpError, PostDialoguesRequest, unknown>,
) => {
    const result = useMutation({
        mutationFn: ({ chatId, prompt }: PostDialoguesRequest) =>
            clientFetch<PostDialoguesResponse>(`/chats/${chatId}/dialogues`, {
                method: 'POST',
                body: JSON.stringify({ prompt }),
            }),
        gcTime: 0,
        ...options,
    });

    return result;
};
