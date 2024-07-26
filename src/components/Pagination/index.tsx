import ReactPaginate from 'react-paginate';
import { FC } from 'react';

import styles from './Pagination.module.scss';

type PaginationProps = {
    onChangePage: (index: number) => void;
    currentPage: number;
};

const Pagination: FC<PaginationProps> = ({ onChangePage, currentPage }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            previousLabel="<"
            nextLabel=" >"
            // тут возвращается index поэтому к 0 + 1
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            renderOnZeroPageCount={null}
            // тут в redux хранится 1 а у них нужно передавать  поэтому 1 - 1 = 0 index  1 страница
            forcePage={currentPage - 1} // какая сейчас страница
        />
    );
};

export default Pagination;

// если у них в библиотеке 0 это 1 страница, то у нас в redux 1 это 1 страница
