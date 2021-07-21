export const getPages = (plugins) =>
  new Map(
    plugins
      .filter(({ pageComponent }) => pageComponent)
      .map(({ pageComponent }) => [pageComponent.name, pageComponent])
  );
