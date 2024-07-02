import 'primereact/resources/themes/arya-blue/theme.css';
import 'primeicons/primeicons.css';

import React, { useEffect, useState } from 'react';

// SERVICES
import Service from '../services/episodes_service';

// CONSTANTS
import C from '@/utils/constants';

// PRIMEREACT
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { PaginatorPageChangeEvent } from 'primereact/paginator';

// COMPONENTS
import Header from '@/components/Header';
import EpisodeCards from '../components/EpisodesCard';
import Pagination from '@/components/Pagination';
import Breadcrumb from '@/components/BreadCrumb';

// INTERFACES
import { Info, Response } from '@/interfaces/Response';
import { Episode } from '@/interfaces/Episode';


export default function Episodes() {

    const service = new Service();

    const [fetchedData, updateFetchedData] = useState<Response<Episode>>({ info: {} as Info, results: [] });
    const [code, setCode] = useState('');
    const [first, setFirst] = useState(0);

    useEffect(() => {
        api(0, '');
    }, []);

    const api = (pagesNumber: number, params: string) => {
        if (params.length == 0) {
            service
                .getAllEpisodes(pagesNumber)
                .then((response) => {
                    updateFetchedData(response);
                })
        } else {
            service
                .getEpisodeByParams(pagesNumber, `episode=S0${params}`)
                .then((response) => {
                    updateFetchedData(response);
                })
        }

    }

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        api(event.page + 1, '');
    }

    const onChangeCodeValue = (event: DropdownChangeEvent) => {
        setCode(event.value);
        api(first, event.value);
    }

    const onClick = () => {
        setCode('');
        api(first, '');
    }

    return (
        <>
            <Header />
            <Breadcrumb items={[{ label: 'Episodes' }]} />
            <div className='mt-5 h-4rem flex justify-content-center align-items-center mt-2 mb-2'>
                <Button className='mr-2 bg-cyan-500 text-white-alpha-90' label='X' onClick={onClick} />
                <Dropdown className='w-4 h-3rem' value={code} onChange={onChangeCodeValue} options={C.SEASON} placeholder='Select a season' />
            </div>
            <div className='mt-5 flex flex-wrap justify-content-center align-items-center'>
                <EpisodeCards results={fetchedData.results} />
            </div>
            <Pagination first={first} info={fetchedData.info} onPageChange={onPageChange} />
        </>
    )
}