import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './navigator.css';
import { setStatus } from '@src/store/actions';
import { STATUS } from '@src/const';
import { globalState, history } from '@src/store/store';
import { QuantityType } from '@src/types/types';

export const Navigator: FC = () => {
    const dispatch = useDispatch();

    const status = useSelector<typeof globalState, STATUS>(
        (state) => state.status
    );

    const search = useSelector<typeof globalState, string>(
        (state) => state.router.location.search
    );

    const quantity = useSelector<typeof globalState, QuantityType>(
        (state) => state.quantity
    );

    const setTabByUrlParam = () => {
        const currentUrlParams = new URLSearchParams(search);

        const urlStatus = currentUrlParams.get('tab')?.toUpperCase();

        if (
            status !== urlStatus &&
            urlStatus &&
            Object.keys(STATUS).includes(urlStatus)
        ) {
            dispatch(setStatus(urlStatus as STATUS));
        }
    };

    useEffect(() => {
        setTabByUrlParam();
    }, [search]);

    const setCurrentStatus = (status: STATUS) => {
        const currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set('tab', status.toLowerCase());
        history.push(
            window.location.pathname + '?' + currentUrlParams.toString()
        );
        dispatch(setStatus(status));
    };

    return (
        <div className="navigator">
            <div
                className={
                    status === STATUS.TO_READ
                        ? 'navigator__item navigator__item_active'
                        : 'navigator__item'
                }
                onClick={() => setCurrentStatus(STATUS.TO_READ)}
            >
                To read ({quantity.TO_READ})
            </div>
            <div
                id="in_progress"
                className={
                    status === STATUS.IN_PROGRESS
                        ? 'navigator__item navigator__item_active'
                        : 'navigator__item'
                }
                onClick={() => setCurrentStatus(STATUS.IN_PROGRESS)}
            >
                In progress ({quantity.IN_PROGRESS})
            </div>
            <div
                className={
                    status === STATUS.DONE
                        ? 'navigator__item navigator__item_active'
                        : 'navigator__item'
                }
                onClick={() => setCurrentStatus(STATUS.DONE)}
            >
                Done ({quantity.DONE})
            </div>
        </div>
    );
};
