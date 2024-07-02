import React from 'react';

import '../node_modules/primeflex/primeflex.css';

import { Card } from 'primereact/card';

import { Character } from '@/interfaces/Character';

export default function Cards(props: { results: Character[] }) {

    let display;

    if (props.results) {
        display = props.results.map((item: Character) => {
            const { id, image, name, status, location, species, origin, gender } = item;
            let statusClass = '';

            if (status == 'Dead') {
                statusClass = 'bg-red-500'
            } else if (status == 'Alive') {
                statusClass = 'bg-blue-500';
            } else if (status == 'unknown') {
                statusClass = 'bg-bluegray-600';
            }

            return (
                <div key={id} className="flex justify-content-center">
                    <Card className="md:w-25rem m-3 border-round">
                        <img className='w-full border-round' src={image} alt='Imagem do personagem' />
                        <div className="p-2">
                            <p className='p-card-title text-cyan-500'> {name} </p>
                            <p><span className={statusClass + ' text-blue-50 p-2 border-round-md'}> {status} </span></p>
                            <p className='flex flex-column'><span className='font-bold text-cyan-500'>Specie</span>{species}</p>
                            <p className='flex flex-column'><span className='font-bold text-cyan-500'>Gender</span>{gender}</p>
                            <p className='flex flex-column'><span className='font-bold text-cyan-500'>Origin</span>{origin.name}</p>
                            <p className='flex flex-column'><span className='font-bold text-cyan-500'>Location</span>{location.name}</p>
                        </div>
                    </Card>
                </div>
            )
        })
    } else {
        display = "Não foi possível encontrar personagens."
    }
    return <> {display} </>
}