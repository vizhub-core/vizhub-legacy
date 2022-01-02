export const createInstance = (constructor, keys, data) => {
  if (!data) return null;
  const instance = new constructor();
  for (const key of keys) {
    instance[key] = data[key];
  }
  return instance;
};
