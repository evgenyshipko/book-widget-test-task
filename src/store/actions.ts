import { BookData, QuantityType } from '@src/types/types';
import { STATUS } from '@src/const';

export enum ACTIONS {
    FILL_STATE = 'FILL_STATE',
    SET_STATUS = 'SET_STATUS',
    SET_INITIAL_BOOK_QUANTITY = 'SET_INITIAL_BOOK_QUANTITY',
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

export const setInitialBookQuantity = (quantity: QuantityType) => ({
    type: ACTIONS.SET_INITIAL_BOOK_QUANTITY,
    payload: quantity,
});

export const changeBookStatus = (initial: STATUS, target: STATUS) => ({
    type: ACTIONS.CHANGE_BOOK_STATUS,
    payload: { initial, target },
});

export const clearFilter = () => ({
    type: ACTIONS.CLEAR_FILTER,
});

export const addTagToFilter = (tagList: string[]) => ({
    type: ACTIONS.ADD_TAG_TO_FILTER,
    payload: tagList,
});
