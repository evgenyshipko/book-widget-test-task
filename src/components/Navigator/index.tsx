import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setStatus } from '@src/store/actions';
import { STATUS } from '@src/const';
import { history } from '@src/store/store';
import { GlobalStorageType, StatusBuffer } from '@src/types/types';

import './navigator.css';

export const Navigator: FC = () => {
    const dispatch = useDispatch();

    const currentStatus = useSelector<GlobalStorageType, STATUS>(
        (state) => state.currentStatus
    );

    const search = useSelector<GlobalStorageType, string>(
        (state) => state.router.location.search
    );

    const statusBuffer = useSelector<GlobalStorageType, StatusBuffer>(
        (state) => state.statusBuffer
    );

    const setTabByUrlParam = () => {
        const currentUrlParams = new URLSearchParams(search);

        const urlStatus = currentUrlParams.get('tab')?.toUpperCase();

        if (
            currentStatus !== urlStatus &&
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
                    currentStatus === STATUS.TO_READ
                        ? 'navigator__item navigator__item_active'
                        : 'navigator__item'
                }
                onClick={() => setCurrentStatus(STATUS.TO_READ)}
            >
                To read ({statusBuffer.TO_READ.length})
            </div>
            <div
                id="in_progress"
                className={
                    currentStatus === STATUS.IN_PROGRESS
                        ? 'navigator__item navigator__item_active'
                        : 'navigator__item'
                }
                onClick={() => setCurrentStatus(STATUS.IN_PROGRESS)}
            >
                In progress ({statusBuffer.IN_PROGRESS.length})
            </div>
            <div
                className={
                    currentStatus === STATUS.DONE
                        ? 'navigator__item navigator__item_active'
                        : 'navigator__item'
                }
                onClick={() => setCurrentStatus(STATUS.DONE)}
            >
                Done ({statusBuffer.DONE.length})
            </div>
        </div>
    );
};
