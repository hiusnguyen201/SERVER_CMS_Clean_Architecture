export const orderedObject = (obj: Object) => {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
};

export const sortedStringify = (value: any) => {
  if (typeof value !== 'object' || value === null || value === undefined) {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return JSON.stringify(value.filter(Boolean));
  }

  return JSON.stringify(
    Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        if (value[key] !== null) {
          acc[key] = value[key];
        }
        return acc;
      }, {}),
  );
};
