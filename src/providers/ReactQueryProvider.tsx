import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { PropsWithChildren } from 'react';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            gcTime: 1000 * 60 * 5,
            throwOnError: true,
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});

export default function ReactQueryProvider(props: PropsWithChildren) {
    const { children } = props;

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}