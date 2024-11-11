import { HttpError } from '@/modules/HttpError';

export const clientFetch = async <T>(...args: Parameters<typeof fetch>) => {
    const url = (process.env.NEXT_PUBLIC_MOCK_API_CLIENT_URL ?? '') + args[0];
    const options = {
        ...args[1],
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            ...args[1]?.headers,
        },
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new HttpError(response.status, response.statusText);
        }
        return response.json() as T;
    } catch (error) {
        if (error instanceof HttpError) {
            console.error(`Fetch error: ${error.message} (Status: ${error.status})`);
        }
        throw error;
    }
};
