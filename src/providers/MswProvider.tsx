'use client';

import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

export function MswProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);

    const startMockServer = async () => {
        // if (process.env.NODE_ENV !== 'development') return;

        if (typeof window !== 'undefined') {
            const { worker } = await import('@/lib/mock/browser/worker');
            await worker.start();
            setIsReady(true);
        }
    };

    useEffect(() => {
        void startMockServer();
    }, []);

    // msw 서버가 준비되기 전에는 로딩 상태를 보여줌
    if (!isReady) {
        return <div>{'Loading...'}</div>;
    }

    return <>{children}</>;
}
