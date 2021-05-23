import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

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

    const currentsStatus = useSelector<GlobalStorageType, STATUS>(
        (state) => state.currentStatus
    );

    const statusBuffer = useSelector<GlobalStorageType, StatusBuffer>(
        (state) => state.statusBuffer
    );

    const filteredData = bookData.filter((bookData) => {
        let result = statusBuffer[currentsStatus].includes(bookData.id);
        filterTags.forEach((tag) => {
            result = result && bookData.tags.includes(tag);
        });
        return result;
    });

    if (filteredData.length === 0) {
        return <div className="content-block_empty">List is empty</div>;
    }
    return (
        <>
            {filteredData.map((bookData) => (
                <Card key={uuidv4()} bookData={bookData} />
            ))}
        </>
    );
};
