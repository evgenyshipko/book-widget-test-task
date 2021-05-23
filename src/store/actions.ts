import { BookData, StatusBuffer } from '@src/types/types';
import { STATUS } from '@src/const';

export enum ACTIONS {
    FILL_STATE = 'FILL_STATE',
    SET_STATUS = 'SET_STATUS',
    SET_STATUS_BUFFER = 'SET_STATUS_BUFFER',
    CHANGE_BOOK_STATUS = 'CHANGE_BOOK_STATUS',
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

export const setStatusBuffer = (quantity: StatusBuffer) => ({
    type: ACTIONS.SET_STATUS_BUFFER,
    payload: quantity,
});

export const changeBookStatus = (
    initial: STATUS,
    target: STATUS,
    id: string
) => ({
    type: ACTIONS.CHANGE_BOOK_STATUS,
    payload: { initial, target, id },
});

export const clearFilter = () => ({
    type: ACTIONS.CLEAR_FILTER,
});

export const addTagToFilter = (tagList: string[]) => ({
    type: ACTIONS.ADD_TAG_TO_FILTER,
    payload: tagList,
});
