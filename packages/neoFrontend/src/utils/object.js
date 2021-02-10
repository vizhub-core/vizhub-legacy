export const omitUndefined = (object) => {
  return Object.keys(object).reduce((refinedObject, key) => {
    if (object[key] !== undefined) {
      refinedObject[key] = object[key];
    }

    return refinedObject;
  }, {});
};
