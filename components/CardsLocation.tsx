import React from "react";

import { Card } from 'primereact/card';

import { Location } from "@/interfaces/Location";

export default function CardLocation(props: { results: Location[] }) {

    let display;

    if (props.results) {
        display = props.results.map((item: Location, index: number) => {
            return (
                <div className="p-card w-5 m-2" key={item.id}>
                    <Card className="p-2 w-full flex flex-column flex-wrap">
                        <h1 className="text-cyan-600 font-bold">{item.name}</h1>
                        <p className="flex flex-column"><span className="text-gray-500 font-bold mb-2">Dimension </span>{item.dimension}</p>
                        <p className="flex flex-column"><span className="text-gray-500 font-bold mb-2">Type</span> {item.type}</p>
                    </Card>
                </div>
            )
        })
    } else {
        display = 'Não foi possível encontrar as localizações';
    }

    return <> {display} </>
}