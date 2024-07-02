
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
            label: 'Characters',
            command: () => {
                router.push('../Characters')
            }

        },
        {
            label: 'Episodes',
            command: () => {
                router.push('../Episodes')
            }
        },
        {
            label: 'Location',
            command: () => {
                router.push('../Location')
            }
        }
    ];

    return (
        <div className='w-full p-1 flex justify-content-around align-items-center'>
            <h1 className='text-4xl'>Rick and Morty Wiki</h1>
            <Menubar className='flex w-4 flex-row bg-gray-900 border-none' model={items} />
        </div>
    )
}
