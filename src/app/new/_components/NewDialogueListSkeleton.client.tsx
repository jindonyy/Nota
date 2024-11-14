'use client';

import Message from '@/components/Message';
import NotaAvatar from '@/components/NotaAvatar';
import { Skeleton } from '@/components/shadcn/skeleton';
import { useChatStore } from '@/stores/chat';
import './NewDialogueListSkeleton.scss';

export default function NewDialogueListSkeleton() {
    const promptValue = useChatStore(({ promptValue }) => promptValue);

    return (
        <div className="chat-dialogue-list-skeleton">
            <div className="chat-dialogue-skeleton-item">
                <div className="chat-dialogue-skeleton-prompt">
                    <Message text={promptValue} hasProfile={false} />
                </div>
                <div className="chat-dialogue-skeleton-completion-skeleton">
                    <div className="chat-dialogue-skeleton-message">
                        <NotaAvatar imageUrl="/static/images/nota_profile.webp" />
                        <Skeleton className="chat-dialogue-skeleton-content" />
                    </div>
                </div>
            </div>
        </div>
    );
}
