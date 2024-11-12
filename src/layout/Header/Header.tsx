import { Suspense } from 'react';

import './Header.scss';

import NotaAvatar from '@/components/NotaAvatar';
import ChatModel from '@/layout/Header/ChatModel';
import ChatModelSkeleton from '@/layout/Header/ChatModelSkeleton';

export default function Header() {
    return (
        <header className="header">
            <Suspense fallback={<ChatModelSkeleton />}>
                <ChatModel />
            </Suspense>
            <NotaAvatar />
        </header>
    );
}
