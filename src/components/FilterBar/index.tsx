import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { globalState, history } from '@src/store/store';
import { Tag } from '@components/Tag';

import { addTagToFilter, clearFilter } from '@src/store/actions';

import './filter_bar.css';

export const FilterBar: FC = () => {
    const dispatch = useDispatch();

    const filterTags = useSelector<typeof globalState, string[]>(
        (state) => state.filterTags
    );

    const search = useSelector<typeof globalState, string>(
        (state) => state.router.location.search
    );

    const handleClearFilter = () => {
        const currentUrlParams = new URLSearchParams(window.location.search);

        currentUrlParams.delete('tags');

        history.push(
            window.location.pathname + '?' + currentUrlParams.toString()
        );

        dispatch(clearFilter());
    };

    const setTagsByUrlParam = (search: string) => {
        const currentUrlParams = new URLSearchParams(search);

        const urlTagStr = currentUrlParams.get('tags');

        if (urlTagStr) {
            const urlTagList = urlTagStr.split(',');

            if (urlTagList.some((tag) => !filterTags.includes(tag))) {
                dispatch(addTagToFilter(urlTagStr.split(',')));
            }
        }
    };

    useEffect(() => {
        setTagsByUrlParam(search);
    }, [search]);

    if (filterTags.length === 0) {
        return <></>;
    }
    return (
        <div className="filter-bar">
            Filtered by tags:{' '}
            {filterTags.map((tag) => (
                <Tag content={tag} key={uuidv4()} isClickable={false} />
            ))}
            (
            <button className="filter-bar__button" onClick={handleClearFilter}>
                clear
            </button>
            )
        </div>
    );
};
