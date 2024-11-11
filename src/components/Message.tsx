import NotaAvatar from '@/components/NotaAvatar';
import { ReactNode } from 'react';

interface Props {
    text: string;
    hasProfile?: boolean;
    profileImageUrl?: string;
    profileFallback?: ReactNode;
    profilePosition?: 'left' | 'right';
}

export default function Message(props: Props) {
    const { text, hasProfile = true, profileImageUrl, profileFallback, profilePosition = 'left' } = props;

    return (
        <div className={`flex gap-3 ${profilePosition === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
            {hasProfile && <NotaAvatar imageUrl={profileImageUrl} fallback={profileFallback} />}
            <p className="p-2 rounded-sm bg-[var(--gray-700)] tracking-wide">{text}</p>
        </div>
    );
}
