// Creates an instance of an entity.
// Supports instanceof checks (e.g. vizInfo instanceof VizInfo).
//
//  * `constructor.keys` is the list of keys to copy from data.
//    It is an extension point for plugins. Plugins may append to
//    this array at import time to augment entities with more properties.
export const createInstance = (constructor, data) => {
  if (!data) return null;
  const instance = new constructor();
  for (const key of constructor.keys) {
    instance[key] = data[key];
  }
  return instance;
};
