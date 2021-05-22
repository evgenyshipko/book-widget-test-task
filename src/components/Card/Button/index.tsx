import { BookData } from '@src/types/types';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { STATUS } from '@src/const';
import { changeBookStatus } from '@src/store/actions';

import arrow from 'src/assets/icons/arrow_forward_24px_outlined.svg';
import backArrow from 'src/assets/icons/subdirectory_arrow_left_24px_outlined.svg';

type ButtonProps = {
    bookData: BookData;
};

const getTitle = (currentStatus: STATUS) => {
    switch (currentStatus) {
        case STATUS.TO_READ:
            return 'start reading';
        case STATUS.IN_PROGRESS:
            return 'finish reading';
        case STATUS.DONE:
            return 'return in «to read»';
    }
};

const getTargetStatus = (currentStatus: STATUS) => {
    switch (currentStatus) {
        case STATUS.TO_READ:
            return STATUS.IN_PROGRESS;
        case STATUS.IN_PROGRESS:
            return STATUS.DONE;
        case STATUS.DONE:
            return STATUS.TO_READ;
    }
};

export const Button: FC<ButtonProps> = ({ bookData }) => {
    const currentStatus = bookData.status;

    const dispatch = useDispatch();

    const handleOnClick = () => {
        const targetStatus = getTargetStatus(currentStatus);
        bookData.status = targetStatus;
        dispatch(changeBookStatus(currentStatus, targetStatus));
    };

    return (
        <button className="card__button" onClick={handleOnClick}>
            {getTitle(currentStatus)}
            <img
                className="button_icon"
                src={currentStatus === STATUS.DONE ? backArrow : arrow}
                alt={''}
            />
        </button>
    );
};
