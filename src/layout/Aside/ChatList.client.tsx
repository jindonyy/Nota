'use client';

import { useParams } from 'next/navigation';

import { useGetChats } from '@/app/[chat_id]/_apis';
import ChatItem from '@/layout/Aside/ChatItem';

export default function ChatList() {
    const params = useParams<{ chat_id: string }>();
    const {
        data: { data },
    } = useGetChats();

    return data.map((chat) => <ChatItem key={chat.chat_id} data={chat} active={params.chat_id === chat.chat_id} />);
}
