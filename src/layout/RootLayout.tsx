import Header from '@/layout/Header/Header';
import type { PropsWithChildren } from 'react';
import './RootLayout.scss';
import Aside from '@/layout/Aside/Aside';

export default function RootLayout(props: PropsWithChildren) {
    const { children } = props;

    return (
        <div className="layout">
            <Aside />
            <div className="layout-right">
                <Header />
                {children}
            </div>
        </div>
    );
}