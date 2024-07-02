import { Location } from "@/interfaces/Location";

export function getDimensions(data: Location[]) {
    let dimensions: String[] = [];

    data.map((item) => {
        dimensions.push(item.dimension);
    });

    dimensions = dimensions.filter((item, index) =>
        dimensions.indexOf(item) == index
    );
    return dimensions;
}