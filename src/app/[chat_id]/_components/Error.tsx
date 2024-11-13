'use client';

import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({}: { error: Error & { digest?: string }; reset: () => void }) {
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        toast({
            variant: 'destructive',
            title: '존재하지 않는 채팅입니다.',
            duration: 3000,
        });
        router.replace('/');
    }, []);

    return null;
}
