import { clientFetch } from '@/modules';
import { useWorkerStore } from '@/stores/worker';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export type Dialogue = {
    dialogue_id: string;
    prompt: string;
    completion: string;
};

export type Chat = {
    chat_model_id: string;
    chat_model_name: string;
    chat_id: string;
    dialogues: Dialogue[];
};

export type Chats = {
    data: Chat[];
};

export const CHATS_API = '/chats';

export const clientGetChats = (init?: RequestInit) => {
    const isWorkerActive = useWorkerStore(({ isWorkerActive }) => isWorkerActive);

    const result = useSuspenseQuery({
        queryKey: [CHATS_API],
        queryFn: async () => (isWorkerActive ? await clientFetch<Chats>(CHATS_API, init) : { data: [] }),
    });

    useEffect(() => {
        if (isWorkerActive) {
            result.refetch();
        }
    }, [isWorkerActive]);

    return result;
};
