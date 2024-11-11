import { DEFAULT_CHAT_MODEL } from '@/constants';
import ChatModel from '@/layout/Header/ChatModel';
import { Suspense } from 'react';
import './Header.scss';
import { Avatar } from '@radix-ui/react-avatar';
import NotaAvatar from '@/components/NotaAvatar';
import { AvatarFallback } from '@/components/shadcn/avatar';
import Icon from '@/components/NotaIcon';

export default async function Header() {
    return (
        <header className="header">
            <Suspense fallback={DEFAULT_CHAT_MODEL.chat_model_name}>
                <ChatModel />
            </Suspense>
            <NotaAvatar fallback={<Icon variant="user" />} />
        </header>
    );
}
