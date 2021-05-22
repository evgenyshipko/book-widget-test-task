import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addTagToFilter } from '@src/store/actions';

import './tag.css';
import { history } from '@src/store/store';

type TagProps = {
    content: string;
    isClickable: boolean;
};

export const Tag: FC<TagProps> = ({ content, isClickable }) => {
    const dispatch = useDispatch();

    const handleOnClick = useCallback(() => {
        const currentUrlParams = new URLSearchParams(window.location.search);

        const tagParams = currentUrlParams.get('tags');

        const tagValue = tagParams ? `${tagParams},${content}` : content;

        currentUrlParams.set('tags', tagValue);

        history.push(
            window.location.pathname + '?' + currentUrlParams.toString()
        );

        dispatch(addTagToFilter([content]));
    }, [content]);

    return (
        <span className="tag" onClick={isClickable ? handleOnClick : undefined}>
            #{content}
        </span>
    );
};
