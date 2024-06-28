import 'primereact/resources/themes/arya-blue/theme.css';
import React, { useEffect, useState } from 'react';

import Header from "@/components/Header";
import Cards from '@/components/Card';
import Breadcrumb from '@/components/BreadCrumb';

import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

import Service from '../services/characters_service';
import C from '../utils/constants';
import Pagination from '@/components/Pagination';

export default function Character() {

    let pagesNumber = 1;
    let gender = '';
    let info, results;
    const service = new Service();

    const [fetchedData, updateFetchedData] = useState([]);
    const [first, setFirst] = useState(0);
    const [selectedGender, setSelectedGender] = useState(null);

    useEffect(() => {
        api();
    }, []);

    const api = () => {
        if (selectedGender == null && gender == '') {
            service
                .getAllCharacters(pagesNumber)
                .then((response) => {
                    updateFetchedData(response);
                });
        } else {
            let paramsReq = `gender=${gender}`;
            service
                .getCharactersByParams(paramsReq, pagesNumber)
                .then((response) => {
                    updateFetchedData(response);
                });
        }
        update(fetchedData['info'], fetchedData['results']);
    }

    const update = function (i: any, r: any) {
        info = i;
        results = r;
    }

    const onPageChange = (event: any) => {
        console.log(fetchedData);
        setFirst(event.first);
        pagesNumber = event.page + 1;
        api();
    };

    const onChangeGenderValue = (event: any) => {
        setSelectedGender(event.value);
        gender = event.value;
        api();
    }

    update(fetchedData['info'], fetchedData['results']);

    const onClick = (event: any) => {
        setSelectedGender(null);
        api();
    }

    return (
        <>
            <Header />
            <Breadcrumb items={[{ label: 'Characters' }]} />
            <div className='flex flex-column flew-wrap justify-content-center align-items-center'>
                <div className='mt-4 mb-4 flex justify-content-center align-items-center'>
                    <Button className='bg-cyan-500 text-white-alpha-90' label='X' onClick={onClick} />
                    <Dropdown value={selectedGender} onChange={onChangeGenderValue}
                        options={C.GENDERS} placeholder='Select a gender' className='w-full md:w-14rem ml-3 mr-3' />
                </div>
                <div className='flex flex-wrap justify-content-center'>
                    <Cards results={fetchedData['results']} />
                </div>
                <Pagination first={first} info={fetchedData['info']} onPageChange={onPageChange} />
            </div>
        </>
    )
}