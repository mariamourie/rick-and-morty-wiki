import 'primereact/resources/themes/arya-blue/theme.css';

import React, { useEffect, useState } from 'react';

import Header from '@/components/Header';
import CardLocation from '@/components/CardsLocation';

import { getAllTypes } from '@/helpers/getAllTypes';

import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

import Service from '@/services/location_service';
import Pagination from '@/components/Pagination';
import Breadcrumb from '@/components/BreadCrumb';

export default function Location() {

    let pagesNumber = 1;
    let info, results;

    const service = new Service();

    const [first, setFirst] = useState(0);
    const [fetchedData, updateFetchedData] = useState([]);

    useEffect(() => {
        api();
    }, [updateFetchedData]);

    const api = () => {
        service
            .getAllLocations(pagesNumber)
            .then((response) => {
                updateFetchedData(response);
            });
    }

    results = fetchedData['results'];
    info = fetchedData['info'];

    const items = [
        {
            label: 'Location'
        }
    ]

    const updateData = function (newInfo, newResults) {
        results = newResults;
        info = newInfo;
    }

    const onPageChange = (event) => {
        pagesNumber = event.page + 1;
        api();
        setFirst(event.first);
    }

    return (
        <div className='w-full'>
            <Header />
            <Breadcrumb items={items} />
            <div className='mt-5 flex flex-wrap justify-content-center align-items-center'>
                <CardLocation results={results} />
            </div>
            <Pagination first={first} info={info} onPageChange={onPageChange} />
        </div>
    )
}