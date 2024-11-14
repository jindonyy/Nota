'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useGetChat } from '@/app/[chat_id]/_apis';
import DialogueItem from '@/app/[chat_id]/_components/DialogueItem';

import './DialogueList.scss';
import { useChatStore } from '@/stores/chat';
import NewDialogueListSkeleton from '@/app/new/_components/NewDialogueListSkeleton.client';
import { useToast } from '@/hooks/useToast';

export default function DialogueList() {
    const params = useParams<{ chat_id: string }>();
    const router = useRouter();
    const { toast } = useToast();
    const isNewDialogueFetching = useChatStore(({ isNewDialogueFetching }) => isNewDialogueFetching);
    const {
        data: { data },
        error,
    } = useGetChat(params.chat_id);

    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    }, [data, isNewDialogueFetching]);

    useEffect(() => {
        if (error?.status === 400) {
            toast({
                variant: 'destructive',
                title: '존재하지 않는 재팅입니다.',
                duration: 3000,
            });
            router.replace('/');
        }
    }, [error]);

    return (
        <div className="chat-dialogue-list">
            {data?.dialogues.map((dialogue) => <DialogueItem key={dialogue.dialogue_id} data={dialogue} />)}
            {isNewDialogueFetching && <NewDialogueListSkeleton />}
        </div>
    );
}
