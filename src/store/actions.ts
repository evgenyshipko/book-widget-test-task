import { BookData, StatusBuffer } from '@src/types/types';
import { STATUS } from '@src/const';

export enum ACTIONS {
    FILL_STATE = 'FILL_STATE',
    SET_STATUS = 'SET_STATUS',
    SET_STATUS_BUFFER = 'SET_STATUS_BUFFER',
    ADD_TAG_TO_FILTER = 'ADD_TAG_TO_SEARCH',
    CLEAR_FILTER = 'CLEAR_FILTER',
}

export const fillStore = (data: BookData[]) => ({
    type: ACTIONS.FILL_STATE,
    payload: data,
});

export const setStatus = (status: STATUS) => ({
    type: ACTIONS.SET_STATUS,
    payload: status,
});

export const setStatusBuffer = (statusBufferInfo: StatusBuffer) => {
    localStorage.setItem('statusBuffer', JSON.stringify(statusBufferInfo));
    return {
        type: ACTIONS.SET_STATUS_BUFFER,
        payload: statusBufferInfo,
    };
};

export const changeBookStatus = (
    currentStatusBuffer: StatusBuffer,
    initial: STATUS,
    target: STATUS,
    id: string
) => {
    const initialBooks = currentStatusBuffer[initial].filter(
        (data) => data !== id
    );

    const targetBooks = currentStatusBuffer[target];
    targetBooks.push(id);

    const statusBufferInfo = {
        ...currentStatusBuffer,
        [initial]: initialBooks,
        [target]: targetBooks,
    };

    localStorage.setItem('statusBuffer', JSON.stringify(statusBufferInfo));

    return {
        type: ACTIONS.SET_STATUS_BUFFER,
        payload: statusBufferInfo,
    };
};

export const clearFilter = () => ({
    type: ACTIONS.CLEAR_FILTER,
});

export const addTagToFilter = (tagList: string[]) => ({
    type: ACTIONS.ADD_TAG_TO_FILTER,
    payload: tagList,
});
