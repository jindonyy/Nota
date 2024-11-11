import Link from 'next/link';

import type { Chat } from '@/models/chat';

interface Props {
    data: Chat;
    active: boolean;
}

export default function ChatItem(props: Props) {
    const { data, active } = props;

    return (
        data.dialogues[0] && (
            <li className={`aside-chat-item ${active ? 'active' : ''}`}>
                <Link href={`/${data.chat_id}?model=${data.chat_model_id}`}>
                    <p className="aside-chat-item-title">{data.dialogues[0].prompt}</p>
                    <span className="aside-chat-item-model">{data.chat_model_name}</span>
                </Link>
            </li>
        )
    );
}
