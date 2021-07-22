import { App } from '../App';
import { decodePageData } from '../pageData';
import { getPages } from '../getPages';
import { setIsClient } from '../isClient';

setIsClient();

export const client = (plugins) => {
  const pageData = decodePageData(window.pageData);
  const pages = getPages(plugins);

  ReactDOM.hydrate(
    <App pageData={pageData} pages={pages} />,
    document.getElementById('root')
  );
};
