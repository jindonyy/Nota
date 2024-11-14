'use client';

import NotaIcon from '@/components/NotaIcon';
import { Button } from '@/components/shadcn/button';
import { useToast } from '@/hooks/useToast';
import { useEffect } from 'react';

export default function ErrorComponent({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const { toast } = useToast();

    useEffect(() => {
        toast({
            variant: 'destructive',
            title: '채팅 조회에 실패했습니다.',
            description: error.digest,
            duration: 3000,
        });
    }, []);

    return (
        <div className="chat-dialogue-list-error chat-dialogue-list">
            <Button onClick={reset} size="icon" variant="ghost">
                <NotaIcon variant="retry" size="lg" />
            </Button>
        </div>
    );
}
