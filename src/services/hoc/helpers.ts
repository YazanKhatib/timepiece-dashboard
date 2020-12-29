let lastId = 0;
export const uid = (prefix = 'id') => {
  lastId++;
  return `${prefix}-${lastId}`;
};
