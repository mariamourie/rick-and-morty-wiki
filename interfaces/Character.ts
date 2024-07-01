import { Episode } from './Episode';

export interface Character {
    created: string;
    episode: Episode[];
    gender: string;
    id: number;
    image: string;
    location: {
        name: string,
        url: string
    };
    name: string;
    origin: {
        name: string,
        url: string
    };
    species: string;
    status: string;
    type: string;
    url: string
}