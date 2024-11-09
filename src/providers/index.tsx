import { MswProvider } from './MswProvider';

import type { PropsWithChildren } from 'react';

export default function Providers(props: PropsWithChildren) {
    const { children } = props;

    return <MswProvider>{children}</MswProvider>;
}
