import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { BookData } from '@src/types/types';
import { Button } from '@components/Card/Button';
import { Tag } from '@components/Tag';

import './card.css';

type CardProps = {
    bookData: BookData;
};

export const Card: FC<CardProps> = ({ bookData }) => {
    return (
        <div className="card">
            <div className="card__author">{bookData.author}</div>
            <div className="card__title">{bookData.title}</div>
            <Button bookData={bookData} />
            <div className="card__description">{bookData.description}</div>
            <div className="card__tags">
                {bookData.tags.map((tag) => (
                    <Tag content={tag} key={uuidv4()} isClickable={true} />
                ))}
            </div>
        </div>
    );
};
