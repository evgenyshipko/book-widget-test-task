import { BookData, StatusBuffer } from '@src/types/types';
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

export function statusBufferReducer(
    state: StatusBuffer = { TO_READ: [], IN_PROGRESS: [], DONE: [] },
    action: {
        type: string;
        payload: { initial: STATUS; target: STATUS; id: string } | StatusBuffer;
    }
): StatusBuffer {
    const { type, payload } = action;
    if (type === ACTIONS.SET_STATUS_BUFFER) {
        localStorage.setItem('statusBuffer', JSON.stringify(payload));
        return payload as StatusBuffer;
    } else if (type === ACTIONS.CHANGE_BOOK_STATUS) {
        const statusInfo = payload as {
            initial: STATUS;
            target: STATUS;
            id: string;
        };
        state[statusInfo.initial] = state[statusInfo.initial].filter(
            (data) => data !== statusInfo.id
        );
        state[statusInfo.target].push(statusInfo.id);
        const statusBuffer = { ...state };
        localStorage.setItem('statusBuffer', JSON.stringify(statusBuffer));
        return statusBuffer;
    }
    return state;
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
