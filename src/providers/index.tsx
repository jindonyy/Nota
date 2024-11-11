import type { PropsWithChildren } from 'react';

import { MswProvider } from './MswProvider';

import ReactQueryProvider from '@/providers/ReactQueryProvider';

export default function Providers(props: PropsWithChildren) {
    const { children } = props;

    return (
        <ReactQueryProvider>
            <MswProvider>{children}</MswProvider>
        </ReactQueryProvider>
    );
}
