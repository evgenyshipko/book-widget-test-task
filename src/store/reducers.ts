import { BookData, QuantityType } from '@src/types/types';
import { ACTIONS } from '@src/store/actions';
import { STATUS } from '@src/const';

export function bookDataReducer(
    state: BookData[] = [],
    action: { type: string; payload: BookData[] }
): BookData[] {
    const { type, payload } = action;
    switch (type) {
        case ACTIONS.FILL_STATE:
            return payload;
        case ACTIONS.CHANGE_BOOK_STATUS:
            localStorage.setItem('bookData', JSON.stringify(state));
            return [...state];
        default:
            return state;
    }
}

export function currentStatusReducer(
    state: STATUS = STATUS.TO_READ,
    action: { type: string; payload: STATUS }
): STATUS {
    const { type, payload } = action;

    switch (type) {
        case ACTIONS.SET_STATUS:
            return payload;
        default:
            return state;
    }
}

export function quantityReducer(
    state: QuantityType = { TO_READ: 0, IN_PROGRESS: 0, DONE: 0 },
    action: {
        type: string;
        payload: { initial: STATUS; target: STATUS } | QuantityType;
    }
): QuantityType {
    const { type, payload } = action;
    switch (type) {
        case ACTIONS.SET_INITIAL_BOOK_QUANTITY:
            return payload as QuantityType;
        case ACTIONS.CHANGE_BOOK_STATUS:
            const payload1 = payload as { initial: STATUS; target: STATUS };
            return {
                ...state,
                [payload1.initial]: state[payload1.initial] - 1,
                [payload1.target]: state[payload1.target] + 1,
            };
        default:
            return state;
    }
}

export function filterTagReducer(
    state: string[] = [],
    action: { type: string; payload: string[] }
): string[] {
    const { type, payload } = action;
    switch (type) {
        case ACTIONS.CLEAR_FILTER:
            return [];
        case ACTIONS.ADD_TAG_TO_FILTER:
            return [...state, ...payload];
        default:
            return state;
    }
}
