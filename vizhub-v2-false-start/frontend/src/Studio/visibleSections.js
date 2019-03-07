// Computes an object representing visible configurator sections
// from the comma separated list stored in the URL.
export const visibleSections = showConfigurator =>
  typeof showConfigurator === 'string'
    ? showConfigurator.split(',').reduce((accumulator, id) => {
        accumulator[id] = true;
        return accumulator;
      }, {})
    : {};
