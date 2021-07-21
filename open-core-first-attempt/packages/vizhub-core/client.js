import { App } from './src/App';
import { decodePageData } from './src/pageData';
export { vizPageClientPlugin } from './src/plugins/vizPagePlugin/client';

// TODO clean this up
export const client = (plugins) => {
  const pageData = decodePageData(window.pageData);
  // TODO refactor into common module
  const pages = new Map(
    plugins
      .filter(({ pageComponent }) => pageComponent)
      .map(({ pageComponent }) => [pageComponent.name, pageComponent])
  );

  ReactDOM.hydrate(
    <App pageData={pageData} pages={pages} />,
    document.getElementById('root')
  );
};
