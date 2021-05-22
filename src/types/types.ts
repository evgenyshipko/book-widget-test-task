import { STATUS } from '@src/const';

export type BookData = {
    id: string;
    author: string;
    title: string;
    description: string;
    tags: string[];
    status: STATUS;
};

export type QuantityType = {
    TO_READ: number;
    IN_PROGRESS: number;
    DONE: number;
};
