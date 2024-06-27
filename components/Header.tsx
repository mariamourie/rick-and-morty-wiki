
import React from 'react';
import { useRouter } from 'next/router';
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/md-dark-deeppurple/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

export default function Header() {

    const router = useRouter();

    const items = [
        {
            label: 'Personagens',
            command: (e) => {
                router.push('../Characters')
            }

        },
        {
            label: 'Episódios',
            command: (e) => {
                router.push('../Episodes')
            }
        },
        {
            label: 'Localização',
            command: (e) => {
                router.push('../Location')
            }
        }
    ];

    return (
        <div className='w-full p-2 flex justify-content-around align-items-center'>
            <h1 className='text-4xl'>Rick and Morty Wiki</h1>
            <Menubar className='flex flex-row' model={items} />
        </div>
    )
}
