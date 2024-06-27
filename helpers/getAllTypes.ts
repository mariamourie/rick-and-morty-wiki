export function getAllTypes(data: any) {
    let types = [];

    data.map((item) => {
        types.push(item.type);
    });

    types = types.filter((item, index) =>
        types.indexOf(item) == index
    );
    return types;
}