import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '../../isomorphic/App';
import { indexHTML } from '../../isomorphic/indexHTML';
import { HomePage } from './HomePage';

const pageComponent = HomePage;

export const homePageServerPlugin = () => ({
  pageComponent,
  extendServer: (expressApp, shareDBConnection, pages) => {
    expressApp.get('/', async (req, res) => {
      const pageData = {
        pageName: pageComponent.name,
        pageProps: {
          vizInfoSnapshots: [{ title: 'Foo' }, { title: 'Bar' }],
        },
      };
      res.type('html');
      res.send(
        indexHTML({
          title: 'VizHub',
          rootHTML: renderToString(<App pageData={pageData} pages={pages} />),
          pageData,
        })
      );
    });
  },
});
