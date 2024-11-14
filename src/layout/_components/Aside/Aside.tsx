import { Suspense } from 'react';

import './Aside.scss';
import AsideHeader from '@/layout/_components/Aside/AsideHeader.client';
import ChatList from '@/layout/_components/Aside/ChatList.client';
import ChatListSkeleton from '@/layout/_components/Aside/ChatListSkeleton';

import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

import ErrorComponent from '@/layout/_components/Aside/ErrorComponent';

export default function Aside() {
    return (
        <aside className="aside">
            <AsideHeader />
            <ErrorBoundary errorComponent={ErrorComponent}>
                <Suspense fallback={<ChatListSkeleton />}>
                    <ChatList />
                </Suspense>
            </ErrorBoundary>
        </aside>
    );
}
