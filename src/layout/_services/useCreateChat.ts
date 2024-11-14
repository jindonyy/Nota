'use client';

import { useToast } from '@/hooks/useToast';
import { useURLSearchParams } from '@/hooks/useURLSearchParams';
import { usePostChat } from '@/layout/_apis';
import { HttpError } from '@/modules/HttpError';
import { useChatStore } from '@/stores/chat';
import { useRouter } from 'next/navigation';

export const useCreateChat = () => {
    const searchParams = useURLSearchParams();
    const router = useRouter();
    const { toast } = useToast();
    const updatePromptValue = useChatStore(({ updatePromptValue }) => updatePromptValue);
    const { mutateAsync: mutateAsyncChat } = usePostChat();

    const postChat = async (chatModelId: string) => {
        try {
            const data = await mutateAsyncChat({ chatModelId });
            const newChat = data.data[data.data.length - 1];

            if (!newChat) {
                throw new HttpError(500);
            }

            return newChat;
        } catch (error) {
            if (error instanceof HttpError) {
                toast({
                    variant: 'destructive',
                    title: '채팅 생성에 실패했습니다. 다시 시도해주세요.',
                    description: `${error.status}: ${error.message}`,
                    duration: 3000,
                });
            }
            throw Error();
        }
    };

    const routeNewLoadingPage = () => {
        searchParams.set('referrer', 'new');
        router.push(`/new?${searchParams.toString()}`);
    };

    const createChat = async (currentModelId: string, prompt: string) => {
        updatePromptValue(prompt);
        routeNewLoadingPage();

        const newChat = await postChat(currentModelId);
        return newChat;
    };

    return { createChat };
};
