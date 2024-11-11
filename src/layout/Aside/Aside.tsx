import { Suspense } from 'react';
import './Aside.scss';
import Link from 'next/link';
import NotaIcon from '@/components/NotaIcon';
import { Button } from '@/components/shadcn/button';
import ChatList from '@/layout/Aside/ChatList.client';
import ChatListSkeleton from '@/layout/Aside/ChatListSkeleton';

export default function Aside() {
    return (
        <aside className="aside">
            <div className="aside-header">
                <Button asChild size="icon" variant="ghost">
                    <Link href="/">
                        <NotaIcon variant="pencil" />
                    </Link>
                </Button>
            </div>
            <Suspense fallback={<ChatListSkeleton />}>
                <ChatList />
            </Suspense>
        </aside>
    );
}
