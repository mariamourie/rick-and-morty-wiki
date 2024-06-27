export function getDimensions(data: any) {
    let dimensions = [];

    data.map((item) => {
        dimensions.push(item.dimension);
    });

    dimensions = dimensions.filter((item, index) =>
        dimensions.indexOf(item) == index
    );
    return dimensions;
}