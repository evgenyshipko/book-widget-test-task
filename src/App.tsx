import React from 'react';
import { Provider } from 'react-redux';
import store, { history } from '@src/store/store';

import { Widget } from '@components/Widget';

import { ConnectedRouter } from 'connected-react-router';

export const App = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Widget />
            </ConnectedRouter>
        </Provider>
    );
};
