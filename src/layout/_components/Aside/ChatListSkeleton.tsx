import { Skeleton } from '@/components/shadcn/skeleton';

export default function ChatListSkeleton() {
    return (
        <div className="aside-chat-list-skeleton">
            {Array.from({ length: 4 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className="aside-chat-item-skeleton">
                    <Skeleton className="aside-chat-item-title-skeleton" />
                    <div className="aside-chat-item-model-skeleton">
                        <Skeleton />
                    </div>
                </div>
            ))}
        </div>
    );
}
