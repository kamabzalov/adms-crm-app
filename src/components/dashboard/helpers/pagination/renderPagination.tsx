/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import {
    useQueryResponseDataLength,
    useQueryResponseLoading,
} from 'common/core/QueryResponseProvider';
import { useQueryRequest } from 'common/core/QueryRequestProvider';
import { initialQueryState } from '_metronic/helpers';

interface UsersListPaginationProps {
    totalRecords: number;
}

export const UsersListPagination = ({ totalRecords }: UsersListPaginationProps) => {
    const [currentpage, setCurrentPage] = useState<number>(0);
    const isLoading = useQueryResponseLoading();
    const searchResultLength = useQueryResponseDataLength();
    const [pagesCount, setPagesCount] = useState<number>(totalRecords);

    const { state, updateState } = useQueryRequest();

    const recordsPerPage = initialQueryState.count;

    useEffect(() => {
        if (!!state.search?.length) {
            setPagesCount(searchResultLength);
        } else {
            setPagesCount(totalRecords);
        }
        if (currentpage !== undefined) {
            updateState({ ...state, currentpage: currentpage * recordsPerPage });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentpage, searchResultLength, state.search]);

    const handleSetCurrentPage = (page: number): void => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(pagesCount / recordsPerPage);

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);

    return (
        <div className='w-100 py-6 col-sm-12 col-md-7 d-flex align-items-center justify-content-center'>
            <div id='kt_table_users_paginate'>
                <ul className='pagination'>
                    <li
                        className={clsx('page-item previous', {
                            disabled: isLoading || currentpage === 0,
                        })}
                    >
                        <a
                            href='#'
                            className='page-link'
                            onClick={() => handleSetCurrentPage(currentpage - 1)}
                        >
                            <i className='previous'></i>
                        </a>
                    </li>

                    {pageNumbers.map((pageNumber) => (
                        <li
                            key={pageNumber}
                            className={clsx('page-item', {
                                disabled: isLoading,
                                active: pageNumber === currentpage,
                            })}
                        >
                            <a
                                href='#'
                                className='page-link'
                                onClick={() => handleSetCurrentPage(pageNumber)}
                            >
                                {pageNumber + 1}
                            </a>
                        </li>
                    ))}

                    <li
                        className={clsx('page-item next', {
                            disabled: isLoading || currentpage === totalPages - 1,
                        })}
                    >
                        <a
                            href='#'
                            className='page-link'
                            onClick={() => handleSetCurrentPage(currentpage + 1)}
                        >
                            <i className='next'></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};
