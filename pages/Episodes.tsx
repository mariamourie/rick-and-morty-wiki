import 'primereact/resources/themes/arya-blue/theme.css';
import 'primeicons/primeicons.css';

import React, { useEffect, useState } from 'react';

import Service from '../services/episodes_service';

import C from '@/utils/constants';

import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

import Header from '@/components/Header';
import EpisodeCards from '../components/EpisodesCard';
import Pagination from '@/components/Pagination';
import Breadcrumb from '@/components/BreadCrumb';

export default function Episodes() {

    const service = new Service();

    let pagesNumber = 1;
    let info, results;
    let params = '';

    const [fetchedData, updateFetchedData] = useState([]);
    const [code, setCode] = useState(null);
    const [first, setFirst] = useState(0);

    useEffect(() => {
        api();
    }, [updateFetchedData]);

    const api = () => {
        if (params.length == 0) {
            service
                .getAllEpisodes(pagesNumber)
                .then((response) => {
                    updateFetchedData(response);

                    results = fetchedData['results'];
                    info = fetchedData['info'];
                })
        } else {
            service
                .getEpisodeByParams(pagesNumber, `episode=S0${params}`)
                .then((response) => {
                    updateFetchedData(response);
                    results = fetchedData['results'];
                    info = fetchedData['info'];
                })
        }

    }

    results = fetchedData['results'];
    info = fetchedData['info'];

    const onPageChange = (event) => {
        setFirst(event.first);
        pagesNumber = event.page + 1;
        api();
    }

    const onChangeCodeValue = (event) => {
        setCode(event.value);
        params = event.value;
        api();
    }

    const onClick = (event) => {
        setCode(null);
        api();
    }

    const items = [
        {
            label: 'Episodes'
        }
    ]

    return (
        <>
            <Header />
            <Breadcrumb items={items} />
            <div className='mt-5 h-4rem flex justify-content-center align-items-center mt-2 mb-2'>
                <Button className='mr-2 bg-cyan-500 text-white-alpha-90' label='X' onClick={onClick} />
                <Dropdown className='w-4 h-3rem' value={code} onChange={onChangeCodeValue} options={C.SEASON} placeholder='Select a season' />
            </div>
            <div className='mt-5 flex flex-wrap justify-content-center align-items-center'>
                <EpisodeCards results={results} />
            </div>
            <Pagination first={first} info={info} onPageChange={onPageChange} />
        </>
    )
}