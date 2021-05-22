import { BookData } from '@src/types/types';

const DATA_URL =
    'https://raw.githubusercontent.com/lastw/test-task/master/data/10-items.json';

export const getBookData = () =>
    fetch(DATA_URL)
        .then((res) => res.json())
        .then((res: { items: BookData[] }) => res.items);
