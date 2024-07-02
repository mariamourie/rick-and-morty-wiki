import React from 'react';

import { Card } from 'primereact/card';

import { Episode } from '@/interfaces/Episode';

export default function EpisodeCards(props: { results: Episode[] }) {
    let display;

    if (props.results) {
        display = props.results.map((item: Episode, index: number) => {

            const { id, name, air_date, episode } = item;

            return (
                <div className='p-card w-5 m-2' key={id}>
                    <Card className='w-full flex flex-column flex-wrap'>
                        <p className='flex flex-column'><span className="mb-2 font-bold text-cyan-500">Name</span>{name}</p>
                        <p className='flex flex-column'><span className="mb-2 font-bold text-cyan-500">Air Date</span>{air_date}</p>
                        <p className='flex flex-column'><span className="mb-2 font-bold text-cyan-500">Episode</span>{episode}</p>
                    </Card>
                </div>
            )
        })
    } else {
        display = "Oops, we were unable to search for episodes."
    }
    return <> {display} </>
}