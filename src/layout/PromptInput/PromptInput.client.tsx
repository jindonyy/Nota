'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { KeyboardEventHandler, useEffect } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import './PromptInput.scss';

import { usePostDialogue } from '@/app/[chat_id]/_apis';
import NotaIcon from '@/components/NotaIcon';
import { Button } from '@/components/shadcn/button';
import { Form, FormControl, FormField, FormItem } from '@/components/shadcn/form';
import { Textarea } from '@/components/shadcn/textarea';
import { queryKeys } from '@/constants/queryKeys';
import { usePostChat } from '@/apis';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';
import { useURLSearchParams } from '@/hooks/useURLSearchParams';
import { HttpError } from '@/modules/HttpError';
import { useChatStore } from '@/stores/chat';

const FormSchema = z.object({
    prompt: z.string().min(1),
});

export function PromptInput() {
    const params = useParams<{ chat_id: string }>();
    const searchParams = useURLSearchParams();
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const prompt = useWatch({ name: 'prompt', control: form.control }) ?? '';
    const updatePromptValue = useChatStore(({ updatePromptValue }) => updatePromptValue);
    const resetPromptValue = useChatStore(({ resetPromptValue }) => resetPromptValue);
    const queryClient = useQueryClient();
    const { mutateAsync: mutateAsyncChat } = usePostChat();
    const { mutate: mutateDialogue, isSuccess } = usePostDialogue();
    const { toast } = useToast();
    const currentModelId = searchParams.get('model');
    const isNewChatPage = !params.chat_id;

    const createChat = async (chatModelId: string) => {
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
                    dir: 'center',
                    duration: 3000,
                });
            }
            throw Error();
        }
    };

    const createDialogue = (chatId: string, prompt: string) => {
        mutateDialogue(
            { chatId, prompt },
            {
                onSuccess: async () => {
                    if (isNewChatPage) {
                        await queryClient.invalidateQueries({ queryKey: [queryKeys.getChats] });
                        router.replace(`/${chatId}?${searchParams.toString()}`);
                    } else {
                        await queryClient.invalidateQueries({ queryKey: [queryKeys.getChat, chatId] });
                    }
                    resetPromptValue();
                },
                onError: (error) => {
                    toast({
                        variant: 'destructive',
                        title: '대화 생성에 실패했습니다. 다시 시도해주세요.',
                        description: `${error.status}: ${error.message}`,
                        dir: 'center',
                        duration: 3000,
                    });
                },
            },
        );
    };

    const handleSubmit: SubmitHandler<{ prompt: string }> = async (data) => {
        updatePromptValue(data.prompt);

        if (isNewChatPage && currentModelId) {
            searchParams.set('referrer', 'new');
            router.push(`/new?${searchParams.toString()}`);
            const newChat = await createChat(currentModelId);
            createDialogue(newChat.chat_id, data.prompt);
        } else {
            createDialogue(params.chat_id, data.prompt);
        }
        form.setValue('prompt', '');
    };

    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    }, [isSuccess]);

    useEffect(() => {
        form.setValue('prompt', '');
    }, [currentModelId, isNewChatPage]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="prompt-input">
                <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                        <FormItem className="prompt-input-content">
                            <FormControl>
                                <Textarea
                                    disabled={!currentModelId}
                                    placeholder={currentModelId ? '무엇이든 물어보세요' : '대화할 모델을 탐색 중...'}
                                    className="prompt-input-textarea resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <Button
                                className="prompt-input-button"
                                type="submit"
                                size="icon"
                                variant="ghost"
                                disabled={!prompt.length}
                            >
                                <NotaIcon variant="send" size="lg" />
                            </Button>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
