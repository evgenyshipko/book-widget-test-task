import { globalState } from '@src/store/store';

export type BookData = {
    id: string;
    author: string;
    title: string;
    description: string;
    tags: string[];
};

export type StatusBuffer = {
    TO_READ: string[];
    IN_PROGRESS: string[];
    DONE: string[];
};

export type GlobalStorageType = typeof globalState;
