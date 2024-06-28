import React from 'react';
import { Paginator } from 'primereact/paginator';

const Pagination = ({ first, info, onPageChange }) => {
    if (info) {
        const { count, pages } = info;
        const rows = Math.round(count / pages);
        return (
            <Paginator className='mt-5' first={first} rows={rows} totalRecords={count} onPageChange={onPageChange} template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }} />
        )
    }
}
export default Pagination