import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import logger from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import {
    bookDataReducer,
    currentStatusReducer,
    filterTagReducer,
    statusBufferReducer,
} from './reducers';

export const history = createBrowserHistory();

const createRootReducer = (history: any) =>
    combineReducers({
        router: connectRouter(history),
        bookData: bookDataReducer,
        currentStatus: currentStatusReducer,
        statusBuffer: statusBufferReducer,
        filterTags: filterTagReducer,
    });

const store = createStore(
    createRootReducer(history),
    compose(applyMiddleware(routerMiddleware(history), logger))
);
export default store;

export const globalState = store.getState();
