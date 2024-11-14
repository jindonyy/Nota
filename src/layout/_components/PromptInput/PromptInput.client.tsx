'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import './PromptInput.scss';

import NotaIcon from '@/components/NotaIcon';
import { Button } from '@/components/shadcn/button';
import { Form, FormControl, FormField, FormItem } from '@/components/shadcn/form';
import { Textarea } from '@/components/shadcn/textarea';
import { useRouter } from 'next/navigation';
import { useURLSearchParams } from '@/hooks/useURLSearchParams';
import { useChatStore } from '@/stores/chat';
import { useCreateChat, useCreateDialogue } from '@/layout/_services';

const FormSchema = z.object({
    prompt: z.string().min(1),
});

export function PromptInput() {
    const params = useParams<{ chat_id: string }>();
    const pathname = usePathname();
    const searchParams = useURLSearchParams();
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const prompt = useWatch({ name: 'prompt', control: form.control }) ?? '';
    const isNewDialogueFetching = useChatStore(({ isNewDialogueFetching }) => isNewDialogueFetching);
    const updatePromptValue = useChatStore(({ updatePromptValue }) => updatePromptValue);
    const resetPromptValue = useChatStore(({ resetPromptValue }) => resetPromptValue);
    const currentModelId = searchParams.get('model');
    const { createChat } = useCreateChat();
    const { createDialogue } = useCreateDialogue();
    const isNewChatPage = !params.chat_id;
    const isNewChatLoadingPage = pathname.split('?')[0] === '/new';

    const handleSubmit: SubmitHandler<{ prompt: string }> = async (data) => {
        updatePromptValue(prompt);
        form.setValue('prompt', '');

        if (isNewChatPage) {
            if (!currentModelId) return;

            const newChat = await createChat(currentModelId, data.prompt);
            await createDialogue(newChat.chat_id, data.prompt);
            router.replace(`/${newChat.chat_id}?model=${currentModelId}&referrer=new`);
        } else {
            await createDialogue(params.chat_id, data.prompt);
        }

        // router 후 초기화
        setTimeout(resetPromptValue, 1000);
    };

    useEffect(() => {
        form.setValue('prompt', '');
    }, [currentModelId, params.chat_id]);

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
                                disabled={!prompt.length || isNewChatLoadingPage || isNewDialogueFetching}
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
