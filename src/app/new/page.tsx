'use client';

import NewDialogueListSkeleton from '@/app/new/_components/NewDialogueListSkeleton.client';
import { useChatStore } from '@/stores/chat';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import './page.scss';

export default function NewPage() {
    const router = useRouter();
    const promptValue = useChatStore(({ promptValue }) => promptValue);

    useLayoutEffect(() => {
        if (!promptValue) {
            router.replace('/');
        }
    }, []);

    return (
        <div className="new-page">
            <NewDialogueListSkeleton />
        </div>
    );
}
