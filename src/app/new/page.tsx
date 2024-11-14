'use client';

import NewDialogueListSkeleton from '@/app/new/_components/NewDialogueListSkeleton.client';
import { useChatStore } from '@/stores/chat';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { useURLSearchParams } from '@/hooks/useURLSearchParams';
import './page.scss';

export const dynamic = 'force-static';

export default function NewPage() {
    const searchParams = useURLSearchParams();
    const router = useRouter();
    const promptValue = useChatStore(({ promptValue }) => promptValue);
    const isNewChatFetching = searchParams.get('referrer') === 'new' && !!promptValue;

    useLayoutEffect(() => {
        if (!isNewChatFetching) {
            router.replace('/');
        }
    }, []);

    return (
        <div className="new-page">
            <NewDialogueListSkeleton />
        </div>
    );
}
