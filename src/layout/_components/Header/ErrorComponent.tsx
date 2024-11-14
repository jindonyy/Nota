'use client';

import NotaIcon from '@/components/NotaIcon';
import { Button } from '@/components/shadcn/button';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ErrorComponent({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        toast({
            variant: 'destructive',
            title: '채팅 모델 조회에 실패했습니다.',
            duration: 3000,
        });
        router.replace('/');
    }, []);

    return (
        <Button onClick={reset} size="icon" variant="ghost">
            <NotaIcon variant="retry" size="lg" />
        </Button>
    );
}
