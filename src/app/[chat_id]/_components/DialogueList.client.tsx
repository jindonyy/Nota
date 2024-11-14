'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useGetChat } from '@/app/[chat_id]/_apis';
import DialogueItem from '@/app/[chat_id]/_components/DialogueItem';

import './DialogueList.scss';
import NewDialogueListSkeleton from '@/app/new/_components/NewDialogueListSkeleton.client';
import { useToast } from '@/hooks/useToast';
import { useChatStore } from '@/stores/chat';

export default function DialogueList() {
    const params = useParams<{ chat_id: string }>();
    const router = useRouter();
    const { toast } = useToast();
    const isNewDialogueFetching = useChatStore(({ isNewDialogueFetching }) => isNewDialogueFetching);
    const {
        data: { data },
    } = useGetChat(params.chat_id);

    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    }, [data, isNewDialogueFetching]);

    return (
        <div className="chat-dialogue-list">
            {data?.dialogues.map((dialogue) => <DialogueItem key={dialogue.dialogue_id} data={dialogue} />)}
            {isNewDialogueFetching && <NewDialogueListSkeleton />}
        </div>
    );
}
