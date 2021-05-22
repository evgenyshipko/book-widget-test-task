import React, { FC } from 'react';
import { BookData } from '@src/types/types';
import { STATUS } from '@src/const';
import { Card } from '@components/Card';
import { v4 as uuidv4 } from 'uuid';

import './content_block.css';
import { useSelector } from 'react-redux';
import { globalState } from '@src/store/store';

type ContentBlockProps = {
    bookData: BookData[];
};

export const ContentBlock: FC<ContentBlockProps> = ({ bookData }) => {
    const filterTags = useSelector<typeof globalState, string[]>(
        (state) => state.filterTags
    );

    const status = useSelector<typeof globalState, STATUS>(
        (state) => state.status
    );

    const filteredData = bookData.filter((bookData) => {
        let result = bookData.status === status;
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
