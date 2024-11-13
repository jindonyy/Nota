import { Skeleton } from '@/components/shadcn/skeleton';

export default function DialogueListSkeleton() {
    return (
        <div className="chat-dialogue-list-skeleton">
            {Array.from({ length: 2 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className="chat-dialogue-skeleton-item">
                    <div className="chat-dialogue-skeleton-prompt">
                        <div className="chat-dialogue-skeleton-message">
                            <Skeleton className="chat-dialogue-skeleton-content" />
                        </div>
                    </div>

                    <div className="chat-dialogue-skeleton-completion">
                        <div className="chat-dialogue-skeleton-message">
                            <Skeleton className="chat-dialogue-skeleton-profile" />
                            <Skeleton className="chat-dialogue-skeleton-content" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
