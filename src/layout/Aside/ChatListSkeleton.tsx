import { Skeleton } from '@/components/shadcn/skeleton';

export default function ChatListSkeleton() {
    return (
        <div className="aside-chat-list-skeleton">
            {Array.from({ length: 10 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className="aside-chat-item-skeleton">
                    <Skeleton className="aside-chat-item-title-skeleton" />
                    <Skeleton className="aside-chat-item-model-skeleton" />
                </div>
            ))}
        </div>
    );
}
