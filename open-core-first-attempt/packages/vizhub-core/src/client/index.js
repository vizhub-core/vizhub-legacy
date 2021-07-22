import { App } from '../isomorphic/App';
import { decodePageData } from '../isomorphic/pageData';
import { getPages } from '../isomorphic/getPages';
import { setIsClient } from '../isomorphic/isClient';

setIsClient();

export const client = (clientPlugins) => {
  const pageData = decodePageData(window.pageData);
  const pages = getPages(clientPlugins);

  ReactDOM.hydrate(
    <App pageData={pageData} pages={pages} />,
    document.getElementById('root')
  );
};
