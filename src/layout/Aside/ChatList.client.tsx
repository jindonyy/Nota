'use client';

import { useParams } from 'next/navigation';

import { useGetChats } from '@/app/[chat_id]/_apis';
import ChatItem from '@/layout/Aside/ChatItem';
import { useEffect } from 'react';

export default function ChatList() {
    const params = useParams<{ chat_id: string }>();
    const {
        data: { data },
    } = useGetChats();

    useEffect(() => {
        console.log(data);
    }, [data]);

    return [...data]
        .reverse()
        .map((chat) => <ChatItem key={chat.chat_id} data={chat} active={params.chat_id === chat.chat_id} />);
}
