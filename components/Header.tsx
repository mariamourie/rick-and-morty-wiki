
import React from 'react';
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

export default function Header() {
    const items = [
        {
            label: 'Personagens',
            icon: 'pi pi-user'
        },
        {
            label: 'Episódios',
            icon: 'pi pi-video'
        },
        {
            label: 'Localização',
            icon: 'pi pi-map-marker'
        }
    ];

    return (
        <>
            <h1 className='header-title'> Rick e Morty Wiki </h1>
            <Menubar model={items} />
        </>
    )
}
