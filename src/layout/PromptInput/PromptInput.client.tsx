'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import './PromptInput.scss';

import { usePostChat } from '@/app/[chat_id]/_apis';
import NotaIcon from '@/components/NotaIcon';
import { Button } from '@/components/shadcn/button';
import { Form, FormControl, FormField, FormItem } from '@/components/shadcn/form';
import { Textarea } from '@/components/shadcn/textarea';
import { queryKeys } from '@/constants/queryKeys';

const FormSchema = z.object({
    prompt: z.string().min(1),
});

export function PromptInput() {
    const params = useParams<{ chat_id: string }>();
    const searchParams = useSearchParams();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const prompt = useWatch({ name: 'prompt', control: form.control }) ?? '';
    const queryClient = useQueryClient();
    const { mutate, isSuccess } = usePostChat(params.chat_id);
    const currentModel = searchParams.get('model');

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        mutate(
            { prompt: data.prompt },
            {
                onSuccess: async () => {
                    await queryClient.invalidateQueries({ queryKey: [queryKeys.getChat] });
                    form.setValue('prompt', '');
                },
            },
        );
    };

    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    }, [isSuccess]);

    useEffect(() => {
        form.setValue('prompt', '');
    }, [searchParams]);

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
                                    disabled={!currentModel}
                                    placeholder={currentModel ? '무엇이든 물어보세요' : '대화할 모델을 선택해주세요'}
                                    className="prompt-input-textarea resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <Button
                                className="prompt-input-button"
                                type="submit"
                                size="icon"
                                variant="ghost"
                                disabled={prompt.length < 1}
                            >
                                <NotaIcon variant="send" />
                            </Button>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
