import React from 'react';
import { renderToString } from 'react-dom/server';
import { VizInfo } from '../../entities/VizInfo';
import { App } from '../../isomorphic/App';
import { indexHTML } from '../../isomorphic/indexHTML';
import { getShareDBSnapshot } from './getShareDBSnapshot';
import { VizPage } from './VizPage';

const pageComponent = VizPage;

export const vizPageServerPlugin = () => ({
  pageComponent,
  extendServer: (expressApp, shareDBConnection, pages) => {
    const getVizInfoSnapshot = getShareDBSnapshot(
      shareDBConnection,
      'documentInfo'
    );

    const getVizContentSnapshot = getShareDBSnapshot(
      shareDBConnection,
      'documentContent'
    );

    expressApp.get('/:userName/:vizId', async (req, res) => {
      const { vizId } = req.params;

      try {
        const [vizInfoSnapshot, vizContentSnapshot] = await Promise.all([
          getVizInfoSnapshot(vizId),
          getVizContentSnapshot(vizId),
        ]);
        if (vizInfoSnapshot === null) {
          return res.send('TODO 404 not found page. need to log in?');
        }

        const pageData = {
          pageName: pageComponent.name,
          pageProps: { vizInfoSnapshot, vizContentSnapshot },
        };
        res.type('html');
        res.send(
          indexHTML({
            title: vizInfoSnapshot.data.title,
            rootHTML: renderToString(<App pageData={pageData} pages={pages} />),
            pageData,
          })
        );
      } catch (error) {
        // Should never happen, but if it does, surface the error clearly.
        console.log(error);
        res.send(error.toString?.());
      }
    });
  },
});
