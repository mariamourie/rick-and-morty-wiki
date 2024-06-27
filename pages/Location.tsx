import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import 'primereact/resources/themes/arya-blue/theme.css';

import Header from '@/components/Header';
import CardLocation from '@/components/CardsLocation';

import { getAllTypes } from '@/helpers/getAllTypes';
import { getDimensions } from '@/helpers/getDimensions';

import { BreadCrumb } from 'primereact/breadcrumb';
import { Paginator } from 'primereact/paginator';
import { Dropdown } from 'primereact/dropdown';

import Service from '@/services/location_service';

export default function Location() {

    let pagesNumber = 1;
    let info, results;
    let types, dimensions = [];
    let params = '';

    const router = useRouter();
    const service = new Service();

    const [type, setType] = useState(null);
    const [dimension, setDimension] = useState(null);

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
            if (type != null && dimension != null) {
                params = `type=${type}&dimension=${dimension}`;
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
        dimensions = getDimensions(results);
    }

    const items = [
        {
            label: 'Location'
        }
    ]

    const home = {
        icon: 'pi pi-home',
        command: (e) => {
            router.push('../')
        }
    }

    const updateData = function (newInfo, newResults) {
        results = newResults;
        info = newInfo;
    }

    const onPageChange = (event) => {
        pagesNumber = event.page + 1;
        api();
        setFirst(event.first);
    }

    const onChangeTypeValue = (event) => {
        setType(event.value);
        params += `type=${event.value}&`;
        api();
    }
    const onChangeDimensionValue = (event) => {
        setDimension(event.value);
        params += `dimension=${event.value}&`
        api();
    }

    return (
        <div className='w-full'>
            <Header />
            <BreadCrumb className='w-full bg-cyan-500' model={items} home={home} />
            <div className='flex justify-content-center mb-5 align-items-left'>
                <i className='pi pi-filter mt-6 mr-2' />
                <Dropdown className='p-1 w-4 mt-5 mr-3' value={type} onChange={onChangeTypeValue} options={types} placeholder='Select a type' />
                <Dropdown className='p-1 w-6 mt-5' value={dimension} onChange={onChangeDimensionValue} options={dimensions} placeholder='Select a dimension' />
            </div>
            <div className='flex flex-wrap justify-content-center align-items-center'>
                <CardLocation results={results} />
            </div>
            <Paginator className='mt-5' first={first} rows={20} totalRecords={826} onPageChange={onPageChange} template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }} />
        </div>
    )
}