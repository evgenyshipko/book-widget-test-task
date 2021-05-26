import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { BookData, GlobalStorageType, StatusBuffer } from '@src/types/types';
import { STATUS } from '@src/const';
import { Card } from '@components/Card';

import './content_block.css';

type ContentBlockProps = {
    bookData: BookData[];
};

export const ContentBlock: FC<ContentBlockProps> = ({ bookData }) => {
    const filterTags = useSelector<GlobalStorageType, string[]>(
        (state) => state.filterTags
    );

    const currentStatus = useSelector<GlobalStorageType, STATUS>(
        (state) => state.currentStatus
    );

    const statusBuffer = useSelector<GlobalStorageType, StatusBuffer>(
        (state) => state.statusBuffer
    );

    const filteredData = useMemo(
        () =>
            bookData.filter((bookData) => {
                let result = statusBuffer[currentStatus].includes(bookData.id);
                filterTags.forEach((tag) => {
                    result = result && bookData.tags.includes(tag);
                });
                return result;
            }),
        [bookData, currentStatus, filterTags, statusBuffer]
    );

    if (filteredData.length === 0) {
        return <div className="content-block_empty">List is empty</div>;
    }
    return (
        <>
            {filteredData.map((bookData) => (
                <Card
                    key={`${bookData.id}-${bookData.title}`}
                    bookData={bookData}
                />
            ))}
        </>
    );
};
