import { Suspense } from 'react';

import './Header.scss';

import NotaAvatar from '@/components/NotaAvatar';
import ChatModel from '@/layout/_components/Header/ChatModel';
import ChatModelSkeleton from '@/layout/_components/Header/ChatModelSkeleton';

import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

import ErrorComponent from '@/layout/_components/Header/ErrorComponent';

export default function Header() {
    return (
        <header className="header">
            <ErrorBoundary errorComponent={ErrorComponent}>
                <Suspense fallback={<ChatModelSkeleton />}>
                    <ChatModel />
                </Suspense>
            </ErrorBoundary>
            <NotaAvatar />
        </header>
    );
}
