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
    let types = [];
    let params = '';

    const service = new Service();

    const [type, setType] = useState(null);

    const [first, setFirst] = useState(0);
    const [fetchedData, updateFetchedData] = useState([]);

    useEffect(() => {
        api();
    }, [updateFetchedData]);

    const api = () => {

        if (params == '') {
            service
                .getAllLocations(pagesNumber)
                .then((response) => {
                    updateFetchedData(response);
                });
        } else {
            if (type != null) {
                params = `type=${type}`;
            }
            service.getLocationByParams(pagesNumber, params).then((response) =>
                updateFetchedData(response));
            updateData(fetchedData['info'], fetchedData['results']);
        }
    }

    results = fetchedData['results'];
    info = fetchedData['info'];

    if (results != undefined) {
        types = getAllTypes(results);
    }

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
    const onClick = (event) => {
        setType(null);
        api();
    }

    const onChangeTypeValue = (event) => {
        setType(event.value);
        params += `type=${event.value}&`;
        api();
    }

    return (
        <div className='w-full'>
            <Header />
            <Breadcrumb items={items} />
            <div className='flex justify-content-center mt-5 mb-5 align-items-center'>
                <Button className='bg-cyan-500 text-white-alpha-90' label='X' onClick={onClick} />
                <Dropdown className='mr-2 ml-2' value={type} onChange={onChangeTypeValue} options={types} placeholder='Select a type' />
            </div>
            <div className='flex flex-wrap justify-content-center align-items-center'>
                <CardLocation results={results} />
            </div>
            <Pagination first={first} info={info} onPageChange={onPageChange} />
        </div>
    )
}