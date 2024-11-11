'use client';

import { clientGetChats } from '@/apis/chat';
import ChatItem from '@/layout/Aside/ChatItem.client';
import { useParams } from 'next/navigation';

interface Props {}

export default function ChatList(props: Props) {
    const { data } = clientGetChats();
    const params = useParams<{ chatId: string }>();

    return data.data.map((chat) => <ChatItem key={chat.chat_id} data={chat} active={params.chatId === chat.chat_id} />);
}
