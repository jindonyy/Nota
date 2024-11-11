'use client';

import { useParams } from 'next/navigation';

import { useGetChat } from '@/apis';
import DialogueItem from '@/app/[chat_id]/_components/DialogueItem';
import './DialogueList.scss';

export default function DialogueList() {
    const params = useParams<{ chat_id: string }>();
    const {
        data: { data },
    } = useGetChat(params.chat_id);

    return (
        <div className="dialogue-list">
            {data?.dialogues.map((dialogue) => <DialogueItem key={dialogue.dialogue_id} data={dialogue} />)}
        </div>
    );
}
