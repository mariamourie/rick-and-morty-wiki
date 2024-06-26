import React, { useEffect, useState } from 'react';
import Cards from '@/components/Card';
import { Paginator } from 'primereact/paginator';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import Service from '../services/characters_services';
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
        console.log(params)
        if (selectedGender == null && selectedStatus == null) {
            service
                .getAllCharacters(pagesNumber)
                .then((response) => {
                    updateFetchedData(response);
                });
        }
        else {
            service
                .getCharactersBy(params, pagesNumber)
                .then((response) => {
                    updateFetchedData(response);
                });
            update(fetchedData['info'], fetchedData['results']);
        }
    }

    results = fetchedData['results'];
    info = fetchedData['info'];
    let { count, pages } = info;

    const onPageChange = (event) => {
        pagesNumber = event.page + 1;
        api();
        update(fetchedData['info'], fetchedData['results']);
        setFirst(event.first);
    };

    const onChangeGenderValue = (event) => {
        setSelectedGender(event.value);
        paramsFilter = selectedStatus == null ? '' : `status=${selectedStatus}`;
        params = `gender=${event.value}&${paramsFilter}`;
        api();
    }

    const onChangeStatusValue = (event) => {
        setSelectedStatus(event.value);
        paramsFilter = selectedGender == null ? '' : `gender=${selectedGender}&`;
        params = `status=${event.value}&${paramsFilter}`;
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

    return (
        <div className='flex flex-column justify-content-center align-items-center'>
            <Toolbar className='m-3 w-8 bg-yellow-400 border-round-3xl' start={genderToolBar} center={statusToolBar} />
            <div className='flex flex-wrap justify-content-center'>
                <Cards results={results} />
            </div>
            <Paginator first={first} rows={20} totalRecords={count} onPageChange={onPageChange} template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }} />
        </div>
    )
}