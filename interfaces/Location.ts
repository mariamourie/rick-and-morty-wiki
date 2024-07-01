import { Character } from "./Character";

export interface Location {
    created: string;
    dimension: string;
    id: number;
    name: string;
    residents: Character[];
    type: string;
    url: string
}