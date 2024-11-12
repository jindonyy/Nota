import { Suspense } from 'react';
import './Aside.scss';
import ChatList from '@/layout/Aside/ChatList.client';
import ChatListSkeleton from '@/layout/Aside/ChatListSkeleton';
import AsideHeader from '@/layout/Aside/AsideHeader.client';

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
