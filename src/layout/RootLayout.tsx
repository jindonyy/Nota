import type { PropsWithChildren } from 'react';

import './RootLayout.scss';

import Aside from '@/layout/_components/Aside/Aside';
import Header from '@/layout/_components/Header/Header';
import { PromptInput } from '@/layout/_components/PromptInput/PromptInput.client';

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
