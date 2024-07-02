import { Location } from '@/interfaces/Location';

export function getAllTypes(data: Location[]) {
    let types: String[] = [];

    data.map((item) => {
        types.push(item.type);
    });

    types = types.filter((item, index) =>
        types.indexOf(item) == index
    );
    return types;
}