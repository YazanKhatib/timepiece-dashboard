let lastId = 0;
export const uid = (prefix: string='id') => {
    lastId++;
    return `${prefix}-${lastId}`;
}