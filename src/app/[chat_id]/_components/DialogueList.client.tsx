'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { useGetChat } from '@/app/[chat_id]/_apis';
import DialogueItem from '@/app/[chat_id]/_components/DialogueItem';

import './DialogueList.scss';
import { useChatStore } from '@/stores/chat';
import NewDialogueListSkeleton from '@/app/new/_components/NewDialogueListSkeleton.client';

export default function DialogueList() {
    const params = useParams<{ chat_id: string }>();
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
