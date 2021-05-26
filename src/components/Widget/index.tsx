import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Navigator } from '@components/Navigator';
import { getBookData } from '@components/Widget/services';
import { fillStore, setStatusBuffer } from '@src/store/actions';
import { STATUS } from '@src/const';
import { ContentBlock } from '@components/ContentBlock';
import { FilterBar } from '@components/FilterBar';
import { BookData, GlobalStorageType, StatusBuffer } from '@src/types/types';

import './widget.css';

export const Widget: FC = () => {
    const dispatch = useDispatch();

    const bookData = useSelector<GlobalStorageType, BookData[]>(
        (state) => state.bookData
    );

    useEffect(() => {
        getBookData().then((bookData) => {
            let statusBuffer: StatusBuffer;
            if (localStorage.getItem('statusBuffer')) {
                statusBuffer = JSON.parse(
                    localStorage.getItem('statusBuffer')!
                );
            } else {
                statusBuffer = {
                    [STATUS.TO_READ]: bookData.map((data) => data.id),
                    [STATUS.DONE]: [],
                    [STATUS.IN_PROGRESS]: [],
                };
            }
            dispatch(setStatusBuffer(statusBuffer));
            dispatch(fillStore(bookData));
        });
    }, []);

    return (
        <div className="widget">
            <Navigator />
            <FilterBar />
            <ContentBlock bookData={bookData} />
        </div>
    );
};
