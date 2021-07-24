import React from 'react';
import { renderToString } from 'react-dom/server';
import { VizInfo } from '../../entities/VizInfo';
import { App } from '../../isomorphic/App';
import { getShareDBSnapshot } from './getShareDBSnapshot';
import { VizPage } from './VizPage';
import { indexHTML } from './indexHTML';

const pageComponent = VizPage;
export const vizPageServerPlugin = () => ({
  pageComponent,
  extendServer: (expressApp, shareDBConnection, pages) => {
    const getVizInfoSnapshot = getShareDBSnapshot(
      shareDBConnection,
      'documentInfo'
    );

    expressApp.get('/:userName/:vizId', async (req, res) => {
      const { vizId } = req.params;

      try {
        const vizInfoSnapshot = await getVizInfoSnapshot(vizId);
        if (vizInfoSnapshot === null) {
          return res.send('TODO 404 not found page. need to log in?');
        }

        const vizInfo = VizInfo(vizInfoSnapshot.data);
        const { title } = vizInfo;

        const pageData = {
          pageName: pageComponent.name,
          pageProps: { vizInfoSnapshot },
        };

        const rootHTML = renderToString(
          <App pageData={pageData} pages={pages} />
        );
        // This works to disable SSR
        //const rootHTML = '';

        res.type('html');
        res.send(indexHTML({ title, rootHTML, pageData }));
      } catch (error) {
        // Should never happen, but if it does, surface the error clearly.
        console.log(error);
        res.send(error.toString?.());
      }
    });
  },
});
