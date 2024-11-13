import { Suspense } from 'react';
import './Aside.scss';
import ChatList from '@/layout/_components/Aside/ChatList.client';
import ChatListSkeleton from '@/layout/_components/Aside/ChatListSkeleton';
import AsideHeader from '@/layout/_components/Aside/AsideHeader.client';

export default function Aside() {
    return (
        <aside className="aside">
            <AsideHeader />
            <Suspense fallback={<ChatListSkeleton />}>
                <ChatList />
            </Suspense>
        </aside>
    );
}
