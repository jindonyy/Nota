import { Suspense } from 'react';

import './page.scss';
import DialogueList from '@/app/[chat_id]/_components/DialogueList';
import DialogueListSkeleton from '@/app/[chat_id]/_components/DialogueListSkeleton';

export default function ChatPage() {
    return (
        <div className="chat-page">
            <Suspense fallback={<DialogueListSkeleton />}>
                <DialogueList />
            </Suspense>
        </div>
    );
}
