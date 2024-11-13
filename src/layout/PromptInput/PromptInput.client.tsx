'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
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
    const queryClient = useQueryClient();
    const { mutateAsync: mutateAsyncChat } = usePostChat();
    const { mutateAsync: mutateAsyncDialogue, isSuccess } = usePostDialogue();
    const { toast } = useToast();
    const currentModelId = searchParams.get('model');
    const hasCurrentModel = !!currentModelId;
    const hasPromptValue = prompt.length > 0;
    const isNewChatPage = !params.chat_id;

    const createChat = async (chatModelId: string) => {
        try {
            const data = await mutateAsyncChat({ chatModelId });
            const newChat = data.data[data.data.length - 1];

            if (!newChat?.chat_id) {
                throw new HttpError(500);
            }

            router.push(`/${newChat.chat_id}?${searchParams.toString()}`);

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
            throw Error;
        }
    };

    const createDialogue = async (chatId: string, prompt: string) => {
        try {
            await mutateAsyncDialogue({ chatId, prompt });
        } catch (error) {
            if (error instanceof HttpError) {
                toast({
                    variant: 'destructive',
                    title: '대화 생성에 실패했습니다. 다시 시도해주세요.',
                    description: `${error.status}: ${error.message}`,
                    dir: 'center',
                    duration: 3000,
                });
            }
            throw Error();
        } finally {
            if (isNewChatPage) {
                queryClient.invalidateQueries({ queryKey: [queryKeys.getChats] });
            }
            console.log([queryKeys.getChat, chatId]);
            queryClient.invalidateQueries({ queryKey: [queryKeys.getChat, chatId] });
        }
    };

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        if (isNewChatPage && currentModelId) {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="prompt-input">
                <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                        <FormItem className="prompt-input-content">
                            <FormControl>
                                <Textarea
                                    disabled={!hasCurrentModel}
                                    placeholder={hasCurrentModel ? '무엇이든 물어보세요' : '대화할 모델을 선택해주세요'}
                                    className="prompt-input-textarea resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <Button
                                className="prompt-input-button"
                                type="submit"
                                size="icon"
                                variant="ghost"
                                disabled={!hasPromptValue}
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
