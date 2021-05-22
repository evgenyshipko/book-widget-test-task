import React, { FC, useEffect } from 'react';
import './widget.css';
import { Navigator } from '@components/Navigator';
import { useDispatch, useSelector } from 'react-redux';
import { getBookData } from '@components/Widget/services';
import { fillStore, setInitialBookQuantity } from '@src/store/actions';
import { STATUS } from '@src/const';
import { globalState, history } from '@src/store/store';
import { ContentBlock } from '@components/ContentBlock';
import { FilterBar } from '@components/FilterBar';
import { BookData } from '@src/types/types';

export const Widget: FC = () => {
    const dispatch = useDispatch();

    const bookData = useSelector<typeof globalState, BookData[]>(
        (state) => state.bookData
    );

    useEffect(() => {
        const currentUrlParams = new URLSearchParams(window.location.search);
        if (!currentUrlParams.get('tab')) {
            history.push(window.location.pathname + '?tab=done&tags=js');
        }
    });

    useEffect(() => {
        getBookData().then((bookData) => {
            if (localStorage.getItem('bookData')) {
                const localStorageBookData: BookData[] = JSON.parse(
                    localStorage.getItem('bookData')!
                );
                bookData.forEach((data) => {
                    const localStorageItem = localStorageBookData.find(
                        (item) => item.id === data.id
                    );
                    if (localStorageItem) {
                        data.status = localStorageItem.status;
                    }
                });
            } else {
                bookData.forEach(
                    (item, index) => (bookData[index].status = STATUS.TO_READ)
                );
            }

            const quantity = bookData.reduce(
                (quantity, data) => {
                    if (data.status) {
                        quantity[data.status]++;
                    }
                    return quantity;
                },
                {
                    TO_READ: 0,
                    DONE: 0,
                    IN_PROGRESS: 0,
                }
            );

            dispatch(setInitialBookQuantity(quantity));
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
