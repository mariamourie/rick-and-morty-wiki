import React from 'react';
import { Card } from 'primereact/card';
import '../node_modules/primeflex/primeflex.css';

export default function Cards({ results }) {

    let display;

    if (results) {
        display = results.map((item) => {
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
                        <img src={image} alt='Imagem do personagem' />
                        <div className="p-2">
                            <p className='p-card-title text-yellow-400'> {name} </p>
                            <p><span className={statusClass + ' text-blue-50 p-2 border-round-md'}> {status} </span></p>
                            <p><span className='text-gray-600'>Specie</span><br /> {species}</p>
                            <p><span className='text-gray-600'>Gender</span><br /> {gender}</p>
                            <p><span className='text-gray-600'>Origin</span><br /> {origin.name}</p>
                            <p><span className='text-gray-600'>Location</span><br />{location.name}</p>
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