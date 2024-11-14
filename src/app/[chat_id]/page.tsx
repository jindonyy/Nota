import { Suspense } from 'react';

import './page.scss';
import DialogueList from '@/app/[chat_id]/_components/DialogueList.client';
import DialogueListFallback from '@/app/[chat_id]/_components/DialogueListFallback.client';
import ErrorComponent from '@/app/[chat_id]/_components/ErrorComponent';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

export default function ChatPage() {
    return (
        <div className="chat-page">
            <ErrorBoundary errorComponent={ErrorComponent}>
                <Suspense fallback={<DialogueListFallback />}>
                    <DialogueList />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
}
