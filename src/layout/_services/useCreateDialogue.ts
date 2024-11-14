'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { usePostDialogue } from '@/app/[chat_id]/_apis';
import { queryKeys } from '@/constants';
import { useToast } from '@/hooks/useToast';
import { HttpError } from '@/modules/HttpError';
import { useChatStore } from '@/stores/chat';

export const useCreateDialogue = () => {
    const params = useParams<{ chat_id: string }>();
    const { toast } = useToast();
    const startNewDialogueFetching = useChatStore(({ startNewDialogueFetching }) => startNewDialogueFetching);
    const endNewDialogueFetching = useChatStore(({ endNewDialogueFetching }) => endNewDialogueFetching);

    const { mutateAsync: mutateAsyncDialogue } = usePostDialogue();
    const queryClient = useQueryClient();
    const isNewChatPage = !params.chat_id;

    const postDialogue = async (chatId: string, prompt: string) => {
        try {
            await mutateAsyncDialogue({ chatId, prompt });

            if (isNewChatPage) {
                await queryClient.invalidateQueries({ queryKey: [queryKeys.getChats] });
            } else {
                await queryClient.invalidateQueries({ queryKey: [queryKeys.getChat, chatId] });
            }
        } catch (error) {
            if (error instanceof HttpError) {
                toast({
                    variant: 'destructive',
                    title: '대화 생성에 실패했습니다. 다시 시도해주세요.',
                    description: `${error.status}: ${error.message}`,
                    duration: 3000,
                });
            }
            throw Error();
        }
    };

    const createDialogue = async (chatId: string, prompt: string) => {
        startNewDialogueFetching();

        await postDialogue(chatId, prompt);

        endNewDialogueFetching();
    };

    return { createDialogue };
};
