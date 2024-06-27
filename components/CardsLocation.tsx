import React from "react";
import { Card } from 'primereact/card';

export default function CardLocation({ results }) {

    let display;

    if (results) {
        display = results.map((item) => {
            return (
                <div className="p-card w-5 m-2">
                    <Card className="bg-cyan-500 w-full flex flex-column flex-wrap" key={item.id} title={item.name}>
                        <p><span className="text-gray-600">Dimension: </span><br />{item.dimension}</p>
                        <p><span className="text-gray-600">Type:</span><br /> {item.type}</p>
                    </Card>
                </div>
            )
        })
    } else {
        display = 'Não foi possível encontrar as localizações';
    }

    return <> {display} </>
}