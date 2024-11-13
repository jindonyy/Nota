import { Suspense } from 'react';

import './page.scss';
import DialogueList from '@/app/[chat_id]/_components/DialogueList.client';
import DialogueListFallback from '@/app/[chat_id]/_components/DialogueListFallback.client';

export default function ChatPage() {
    return (
        <div className="chat-page">
            <Suspense fallback={<DialogueListFallback />}>
                <DialogueList />
            </Suspense>
        </div>
    );
}
