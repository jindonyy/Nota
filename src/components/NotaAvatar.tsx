import type { ReactNode } from 'react';

import NotaIcon from '@/components/NotaIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar';

interface Props {
    imageUrl?: string;
    fallback?: ReactNode;
    size?: 'default' | 'sm' | 'lg';
}

const sizes = {
    default: 'size-10',
    sm: 'size8',
    lg: 'size-12',
};

export default function NotaAvatar(props: Props) {
    const { imageUrl, fallback, size = 'default' } = props;

    return (
        <Avatar className={sizes[size]}>
            <AvatarImage src={imageUrl} alt="사용자 프로필" />
            <AvatarFallback>{fallback ?? <NotaIcon variant="user" color="secondary" />}</AvatarFallback>
        </Avatar>
    );
}
