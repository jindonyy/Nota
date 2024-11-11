'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar';
import { ReactNode } from 'react';

interface Props {
    imageSrc?: string;
    fallback?: ReactNode;
    size?: 'default' | 'sm' | 'lg';
}

const sizes = {
    default: 'size-10',
    sm: 'size8',
    lg: 'size-12',
};

export default function NotaAvatar(props: Props) {
    const { imageSrc, fallback, size = 'default' } = props;

    return (
        <Avatar className={sizes[size]}>
            <AvatarImage src={imageSrc} alt="사용자 프로필" />
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    );
}
