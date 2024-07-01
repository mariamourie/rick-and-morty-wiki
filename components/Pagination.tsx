import React from 'react';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

const Pagination = (props: { info: { count: number, pages: number }, onPageChange: (event: PaginatorPageChangeEvent) => void, first: number }) => {
    if (props.info) {
        const { count, pages } = props.info;
        const rows = Math.round(count / pages);
        return (
            <Paginator className='mt-5' first={props.first} rows={rows} totalRecords={count} onPageChange={props.onPageChange} template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }} />
        )
    }
}
export default Pagination