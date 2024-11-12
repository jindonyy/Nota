'use client';

import NotaIcon from '@/components/NotaIcon';
import { Button } from '@/components/shadcn/button';
import Link from 'next/link';

import { useSearchParams } from 'next/navigation';

export default function AsideHeader() {
    const searchParams = useSearchParams();

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
