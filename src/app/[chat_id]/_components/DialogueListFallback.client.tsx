'use client';

import DialogueListSkeleton from '@/app/[chat_id]/_components/DialogueListSkeleton';
import NewDialogueListSkeleton from '@/app/new/_components/NewDialogueListSkeleton.client';
import { useURLSearchParams } from '@/hooks/useURLSearchParams';
import { useChatStore } from '@/stores/chat';
import './DialogueList.scss';

export default function DialogueListFallback() {
    const searchParams = useURLSearchParams();
    const promptValue = useChatStore(({ promptValue }) => promptValue);
    const isNewDialogueFetching = searchParams.get('referrer') === 'new' && !!promptValue;

    return isNewDialogueFetching ? <NewDialogueListSkeleton /> : <DialogueListSkeleton />;
}
