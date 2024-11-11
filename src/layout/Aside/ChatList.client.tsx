'use client';

import { useParams } from 'next/navigation';

import { useGetChats } from '@/apis';
import ChatItem from '@/layout/Aside/ChatItem.client';

export default function ChatList() {
    const {
        data: { data },
    } = useGetChats();
    const params = useParams<{ chat_id: string }>();

    return data.map((chat) => <ChatItem key={chat.chat_id} data={chat} active={params.chat_id === chat.chat_id} />);
}
