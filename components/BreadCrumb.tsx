import React from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useRouter } from 'next/router';

export default function Breadcrumb({ items }) {
    const router = useRouter();

    const home = {
        icon: 'pi pi-home',
        command: (e) => {
            router.push('../')
        }
    }

    return (
        <BreadCrumb className='w-full bg-cyan-500' model={items} home={home} />
    )
}

