import 'primereact/resources/themes/arya-blue/theme.css';

import React, { useEffect, useState } from 'react';

// PRIMEREACT
import { PaginatorPageChangeEvent } from 'primereact/paginator';

// COMPONENTS
import Header from '@/components/Header';
import CardLocation from '@/components/CardsLocation';
import Pagination from '@/components/Pagination';
import Breadcrumb from '@/components/BreadCrumb';

// SERVICES
import Service from '@/services/location_service';

// INTERFACES
import { Info, Response } from '@/interfaces/Response';
import { Location } from '@/interfaces/Location';

export default function Locations() {

    const service = new Service();

    const [first, setFirst] = useState(0);
    const [fetchedData, updateFetchedData] = useState<Response<Location>>({ info: {} as Info, results: [] });

    useEffect(() => {
        api(0);
    }, []);

    const api = (pagesNumber: number) => {
        service
            .getAllLocations(pagesNumber)
            .then((response) => {
                updateFetchedData(response);
            });
    }

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        api(event.page + 1);
    }

    return (
        <div className='w-full'>
            <Header />
            <Breadcrumb items={[{ label: 'Location' }]} />
            <div className='mt-5 flex flex-wrap justify-content-center align-items-center'>
                <CardLocation results={fetchedData.results} />
            </div>
            <Pagination first={first} info={fetchedData.info} onPageChange={onPageChange} />
        </div>
    )
}