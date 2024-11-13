'use client';

import NotaIcon from '@/components/NotaIcon';
import { Button } from '@/components/shadcn/button';
import { useURLSearchParams } from '@/hooks/useURLSearchParams';
import Link from 'next/link';

export default function AsideHeader() {
    const searchParams = useURLSearchParams();
    searchParams.delete('referrer');

    return (
        <div className="aside-header">
            <Button asChild size="icon" variant="ghost">
                <Link href={`/?${searchParams.toString()}`}>
                    <NotaIcon variant="pencil" />
                </Link>
            </Button>
        </div>
    );
}
