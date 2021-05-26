import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '@src/store/store';
import { Tag } from '@components/Tag';
import { GlobalStorageType } from '@src/types/types';
import { addTagToFilter, clearFilter } from '@src/store/actions';

import './filter_bar.css';

export const FilterBar: FC = () => {
    const dispatch = useDispatch();

    const filterTags = useSelector<GlobalStorageType, string[]>(
        (state) => state.filterTags
    );

    const search = useSelector<GlobalStorageType, string>(
        (state) => state.router.location.search
    );

    const handleClearFilter = useCallback(() => {
        const currentUrlParams = new URLSearchParams(window.location.search);

        currentUrlParams.delete('tags');

        history.push(
            window.location.pathname + '?' + currentUrlParams.toString()
        );

        dispatch(clearFilter());
    }, [dispatch]);

    const setTagsByUrlParam = useCallback(
        (search: string) => {
            const currentUrlParams = new URLSearchParams(search);

            const urlTagStr = currentUrlParams.get('tags');

            if (urlTagStr) {
                const urlTagList = urlTagStr.split(',');

                if (urlTagList.some((tag) => !filterTags.includes(tag))) {
                    dispatch(addTagToFilter(urlTagStr.split(',')));
                }
            }
        },
        [search, filterTags]
    );

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
                <Tag content={tag} key={`${tag}-key1`} isClickable={false} />
            ))}
            (
            <button className="filter-bar__button" onClick={handleClearFilter}>
                clear
            </button>
            )
        </div>
    );
};
