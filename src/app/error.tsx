'use client';

import { useEffect } from 'react';

import './error.scss';
import { Button } from '@/components/shadcn/button';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const handleReload = () => {
        reset();
    };

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="shop">
            <div className="error-page">
                <p className="error-page-text">
                    {'로드 중 오류'}
                    <br />
                    {'다시 시도해주세요.'}
                </p>
                <Button onClick={handleReload} size="lg">
                    <div>{'새로고침'}</div>
                </Button>
            </div>
        </div>
    );
}
