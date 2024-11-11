'use client';

import { clientGetChats } from '@/apis';
import ChatItem from '@/layout/Aside/ChatItem.client';
import { useParams } from 'next/navigation';

export default function ChatList() {
    const {
        data: { data },
    } = clientGetChats();
    const params = useParams<{ chat_id: string }>();

    return data.map((chat) => <ChatItem key={chat.chat_id} data={chat} active={params.chat_id === chat.chat_id} />);
}
