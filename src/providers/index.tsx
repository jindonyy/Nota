import { MswProvider } from './MswProvider';

import ReactQueryProvider from '@/providers/ReactQueryProvider';
import type { PropsWithChildren } from 'react';

export default function Providers(props: PropsWithChildren) {
    const { children } = props;

    return (
        <ReactQueryProvider>
            <MswProvider>{children}</MswProvider>
        </ReactQueryProvider>
    );
}
