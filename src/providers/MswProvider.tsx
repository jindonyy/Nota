'use client';

import { useWorkerStore } from '@/stores/worker';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

export function MswProvider({ children }: PropsWithChildren) {
    const onWorkerActive = useWorkerStore(({ onWorkerActive }) => onWorkerActive);
    const [isReady, setIsReady] = useState(false);

    const startMockServer = async () => {
        if (process.env.NODE_ENV !== 'development') return;

        if (typeof window !== 'undefined') {
            const { worker } = await import('@/lib/mock/browser/worker');
            await worker.start();
            setIsReady(true);
            onWorkerActive();
        }
    };

    useEffect(() => {
        void startMockServer();
    }, []);

    return <>{children}</>;
}
