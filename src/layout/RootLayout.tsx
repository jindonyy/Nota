import Header from '@/layout/Header/Header';
import type { PropsWithChildren } from 'react';
import './RootLayout.scss';
import Aside from '@/layout/Aside/Aside';
import { ChatInput } from '@/layout/ChatInput/ChatInput';

export default function RootLayout(props: PropsWithChildren) {
    const { children } = props;

    return (
        <div className="layout">
            <Aside />
            <Header />
            <main className="layout-main">{children}</main>
            <ChatInput />
        </div>
    );
}
