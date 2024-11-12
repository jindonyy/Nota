import { Skeleton } from '@/components/shadcn/skeleton';

export default function DialogueListSkeleton() {
    return (
        <div className="chat-dialogue-skeleton-list">
            {Array.from({ length: 2 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div className="chat-dialogue-skeleton-item" key={index}>
                    <div className="chat-dialogue-item-skeleton-prompt">
                        <div className="chat-dialogue-item-skeleton-message">
                            <Skeleton className="chat-dialogue-item-skeleton-content" />
                        </div>
                    </div>
                    <div className="chat-dialogue-item-skeleton-completion-skeleton">
                        <div className="chat-dialogue-item-skeleton-message">
                            <Skeleton className="chat-dialogue-item-skeleton-profile" />
                            <Skeleton className="chat-dialogue-item-skeleton-content" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
