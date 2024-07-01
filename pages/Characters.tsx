import 'primereact/resources/themes/arya-blue/theme.css';

import React, { useEffect, useState } from 'react';

// COMPONENTS
import Header from "@/components/Header";
import Cards from '@/components/Card';
import Breadcrumb from '@/components/BreadCrumb';
import Pagination from '@/components/Pagination';

// SERVICES
import Service from '@/services/characters_service';

// INTERFACES
import { Info, Response } from '@/interfaces/Response';
import { Character } from '@/interfaces/Character';

export default function Characters() {

    const service = new Service();

    const [fetchedData, updateFetchedData] = useState<Response<Character>>({ info: {} as Info, results: [] });
    const [first, setFirst] = useState(0);

    useEffect(() => {
        api(0);
    }, []);

    const api = (pagesNumber: number) => {
        service
            .getAllCharacters(pagesNumber)
            .then((response) => {
                updateFetchedData(response);
            });
    }

    const onPageChange = (event: any) => {
        setFirst(event.first);
        api(event.page + 1);
    };

    return (
        <>
            <Header />
            <Breadcrumb items={[{ label: 'Characters' }]} />
            <div className='mt-5 flex flex-wrap justify-content-center'>
                <Cards results={fetchedData.results} />
            </div>
            <Pagination first={first} info={fetchedData.info} onPageChange={onPageChange} />
        </>
    )
}