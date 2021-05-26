import React, { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BookData, GlobalStorageType, StatusBuffer } from '@src/types/types';
import { STATUS } from '@src/const';
import { changeBookStatus } from '@src/store/actions';

import rightArrow from 'src/assets/icons/arrow_forward_24px_outlined.svg';
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
    const dispatch = useDispatch();

    const currentStatus = useSelector<GlobalStorageType, STATUS>(
        (state) => state.currentStatus
    );

    const currentStatusBuffer = useSelector<GlobalStorageType, StatusBuffer>(
        (state) => state.statusBuffer
    );

    const targetStatus = useMemo(() => getTargetStatus(currentStatus), [
        currentStatus,
    ]);

    const handleOnClick = useCallback(() => {
        dispatch(
            changeBookStatus(
                currentStatusBuffer,
                currentStatus,
                targetStatus,
                bookData.id
            )
        );
    }, [currentStatus, currentStatusBuffer, targetStatus, bookData]);

    const title = useMemo(() => getTitle(currentStatus), [currentStatus]);

    const icon = useMemo(
        () => (currentStatus === STATUS.DONE ? backArrow : rightArrow),
        [currentStatus]
    );

    return (
        <button className="card__button" onClick={handleOnClick}>
            {title}
            <img className="button_icon" src={icon} alt={''} />
        </button>
    );
};
