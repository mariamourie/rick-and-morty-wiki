import React from 'react';

import { useRouter } from 'next/router';

import { BreadCrumb } from 'primereact/breadcrumb';

export default function Breadcrumb(props: { items: [{}] }) {
    const router = useRouter();

    const home = {
        icon: 'pi pi-home',
        command: () => {
            router.push('../')
        }
    }

    return (
        <BreadCrumb className='w-full bg-cyan-500' model={props.items} home={home} />
    )
}

