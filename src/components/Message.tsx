import type { ReactNode } from 'react';

import NotaAvatar from '@/components/NotaAvatar';

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
        <div className={`message flex gap-3 ${profilePosition === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
            {hasProfile && <NotaAvatar imageUrl={profileImageUrl} fallback={profileFallback} />}
            <pre className="px-3 py-2.5 rounded-sm bg-[var(--gray-750)] tracking-wide leading-6">{text}</pre>
        </div>
    );
}
