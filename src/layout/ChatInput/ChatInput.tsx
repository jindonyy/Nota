'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/shadcn/button';
import { Form, FormControl, FormField, FormItem } from '@/components/shadcn/form';
import { Textarea } from '@/components/shadcn/textarea';
import NotaIcon from '@/components/NotaIcon';
import './ChatInput.scss';

const FormSchema = z.object({
    message: z.string().min(1),
});

export function ChatInput() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const message = useWatch({ name: 'message', control: form.control }) ?? '';

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        form.setValue('message', '');
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="chat-input">
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="chat-input-textarea">
                            <FormControl>
                                <Textarea placeholder="무엇이든 물어보세요" className="resize-none" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" size="icon" variant="ghost" disabled={message.length < 1}>
                    <NotaIcon variant="send" />
                </Button>
            </form>
        </Form>
    );
}
