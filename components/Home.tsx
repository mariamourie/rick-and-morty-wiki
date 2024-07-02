import React from 'react';

import { Image } from 'primereact/image';
import { Card } from 'primereact/card';

import 'primereact/resources/themes/arya-blue/theme.css';

import '../node_modules/primeflex/primeflex.css';

import Header from './Header';

export default function Home() {
    const url = '/rick-and-morty-header.jpg'

    return (
        <>
            <Header />
            <div className='homeImage w-full flex flex-column mt-5 lign-items-center justify-content-center'>
                <Card className='mb-2 bg-cyan-500'>
                    <h1>Welcome to Rick and Morty Wiki</h1>
                    <p>Discover more about the characters, episodes and locations of the Rick and Morty series.</p>
                </Card>
                <Image src={url} alt={"Rick and Morty header"} width={'100%'}>
                    Olá
                </Image>
            </div>

        </>
    );
}