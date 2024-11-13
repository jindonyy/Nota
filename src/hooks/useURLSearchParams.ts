'use client';

import { useSearchParams } from 'next/navigation';

export const useURLSearchParams = () => {
    const searchParams = useSearchParams();
    const newSearchParams = new URLSearchParams(searchParams);

    return newSearchParams;
};
