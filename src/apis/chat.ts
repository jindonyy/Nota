'use client';

import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import type { Chat } from '@/app/[chat_id]/_models';
import { clientFetch } from '@/modules';
import type { HttpError } from '@/modules/HttpError';
import type { Data } from '@/types/data';

// 채팅 생성
export type PostChatRequest = { chatModelId: string };
export type PostChatResponse = Data<Chat[]>;

export const usePostChat = (options?: UseMutationOptions<PostChatResponse, HttpError, PostChatRequest, unknown>) => {
    const result = useMutation({
        mutationFn: ({ chatModelId }: PostChatRequest) =>
            clientFetch<PostChatResponse>(`/chats`, {
                method: 'POST',
                body: JSON.stringify({ chat_model_id: chatModelId }),
            }),
        gcTime: 0,
        ...options,
    });

    return result;
};
