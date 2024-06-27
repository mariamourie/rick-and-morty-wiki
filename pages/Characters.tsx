import React, { useEffect, useState } from 'react';

import Header from "@/components/Header";
import Cards from '@/components/Card';

import { Paginator } from 'primereact/paginator';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import { BreadCrumb } from 'primereact/breadcrumb';

import 'primereact/resources/themes/arya-blue/theme.css';

import Service from '../services/characters_service';

import C from '../utils/constants';

export default function Character() {

    let pagesNumber = 1;
    let info, results;
    let paramsFilter = '';
    let params = '';
    const service = new Service();

    const [fetchedData, updateFetchedData] = useState([]);
    const [first, setFirst] = useState(0);

    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);

    const update = function (newInfo, newResults) {
        info = newInfo;
        results = newResults;
    }

    useEffect(() => {
        api();
    }, [updateFetchedData]);

    const api = () => {
        if (selectedGender == null && selectedStatus == null) {
            service
                .getAllCharacters(pagesNumber)
                .then((response) => {
                    updateFetchedData(response);
                });
        }
        else {
            if (selectedGender != null && selectedStatus != null) {
                params = `gender=${selectedGender}&status=${selectedStatus}`
            }
            service
                .getCharactersByParams(params, pagesNumber)
                .then((response) => {
                    updateFetchedData(response);
                });
            update(fetchedData['info'], fetchedData['results']);
        }
    }

    results = fetchedData['results'];
    info = fetchedData['info'];

    const onPageChange = (event) => {
        setFirst(event.first);
        pagesNumber = event.page + 1;
        console.log(params)
        api();
    };

    const onChangeGenderValue = (event) => {
        setSelectedGender(event.value);
        params += `gender=${event.value}&`;
        api();
    }

    const onChangeStatusValue = (event) => {
        setSelectedStatus(event.value);
        params += `status=${event.value}&`;
        api();
    }

    const genderToolBar = (
        <Dropdown value={selectedGender} onChange={onChangeGenderValue}
            options={C.GENDERS} placeholder='Select a gender' className='w-full md:w-14rem' />
    )

    const statusToolBar = (
        <Dropdown value={selectedStatus} onChange={onChangeStatusValue}
            options={C.STATUS} placeholder='Select a status' className='w-full md:w-14rem' />
    )

    const items = [
        {
            label: 'Episodes'
        }
    ]
    const home = {
        icon: 'pi pi-home',
        command: (e) => {
            router.push('../')
        }
    }

    return (
        <>
            <Header />
            <BreadCrumb className='w-full bg-cyan-500' model={items} home={home} />
            <div className='flex flex-column flew-wrap justify-content-center align-items-center'>
                <div className='mt-4 mb-4 flex justify-content-center align-items-center'>
                    <i className='pi pi-filter mr-3' />
                    <Dropdown value={selectedGender} onChange={onChangeGenderValue}
                        options={C.GENDERS} placeholder='Select a gender' className='w-full md:w-14rem mr-3' />
                    <Dropdown value={selectedStatus} onChange={onChangeStatusValue}
                        options={C.STATUS} placeholder='Select a status' className='w-full md:w-14rem' />
                </div>
                <div className='flex flex-wrap justify-content-center'>
                    <Cards results={results} />
                </div>
                <Paginator first={first} rows={20} totalRecords={826} onPageChange={onPageChange} template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }} />
            </div>
        </>
    )
}