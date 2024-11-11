import { create } from 'zustand';

interface WorkerStore {
    isWorkerActive: boolean;
    onWorkerActive(): void;
    offWorkerActive(): void;
}

export const useWorkerStore = create<WorkerStore>((set) => ({
    isWorkerActive: false,
    onWorkerActive: () => set(({ isWorkerActive }) => ({ isWorkerActive: true })),
    offWorkerActive: () => set(({ isWorkerActive }) => ({ isWorkerActive: false })),
}));
