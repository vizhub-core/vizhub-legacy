import { App } from '../isomorphic/App';
import { getPages } from '../isomorphic/getPages';
import { setIsClient } from '../isomorphic/isClient';

setIsClient();

export const client = (clientPlugins) => {
  ReactDOM.hydrate(
    <App pageData={window.pageData} pages={getPages(clientPlugins)} />,
    document.getElementById('root')
  );
};
