import type { PropsWithChildren } from 'react';

import './RootLayout.scss';

import Aside from '@/layout/Aside/Aside';
import Header from '@/layout/Header/Header';
import { PromptInput } from '@/layout/PromptInput/PromptInput';

export default function RootLayout(props: PropsWithChildren) {
    const { children } = props;

    return (
        <div className="layout">
            <Aside />
            <Header />
            <main className="layout-main">{children}</main>
            <PromptInput />
        </div>
    );
}
