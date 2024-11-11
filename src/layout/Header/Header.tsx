import { Suspense } from 'react';

import './Header.scss';

import NotaAvatar from '@/components/NotaAvatar';
import { DEFAULT_CHAT_MODEL } from '@/constants';
import ChatModel from '@/layout/Header/ChatModel';

export default async function Header() {
    return (
        <header className="header">
            <Suspense fallback={DEFAULT_CHAT_MODEL.chat_model_name}>
                <ChatModel />
            </Suspense>
            <NotaAvatar />
        </header>
    );
}
