import 'primereact/resources/themes/arya-blue/theme.css';

import React, { useEffect, useState } from 'react';

import Header from "@/components/Header";
import Cards from '@/components/Card';
import Breadcrumb from '@/components/BreadCrumb';

import Service from '../services/characters_service';
import Pagination from '@/components/Pagination';

export default function Character() {

    let pagesNumber = 1;
    let info, results;
    const service = new Service();

    const [fetchedData, updateFetchedData] = useState([]);
    const [first, setFirst] = useState(0);

    useEffect(() => {
        api();
    }, []);

    const api = () => {
        
        service
            .getAllCharacters(pagesNumber)
            .then((response) => {
                updateFetchedData(response);
            });
        update(fetchedData['info'], fetchedData['results']);
    }

    const update = function (i: any, r: any) {
        info = i;
        results = r;
    }

    const onPageChange = (event: any) => {
        setFirst(event.first);
        pagesNumber = event.page + 1;
        api();
    };

    return (
        <>
            <Header />
            <Breadcrumb items={[{ label: 'Characters' }]} />
            <div className='flex flex-column flew-wrap justify-content-center align-items-center'>
                <div className='flex flex-wrap justify-content-center'>
                    <Cards results={fetchedData['results']} />
                </div>
                <Pagination first={first} info={fetchedData['info']} onPageChange={onPageChange} />
            </div>
        </>
    )
}