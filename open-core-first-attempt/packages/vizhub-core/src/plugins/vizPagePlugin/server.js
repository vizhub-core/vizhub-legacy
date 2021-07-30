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

    const getUserSnapshot = getShareDBSnapshot(shareDBConnection, 'user');

    expressApp.get('/:userName/:vizId', async (req, res) => {
      const { vizId } = req.params;

      try {
        const [vizInfoSnapshot, vizContentSnapshot] = await Promise.all([
          getVizInfoSnapshot(vizId),
          getVizContentSnapshot(vizId),
        ]);
        if (vizInfoSnapshot === null) {
          // TODO serve example from GitHub Gist.
          // TODO present a banner stating this is hosted in GitHub Gist.
          // TODO present an option to import into VizHub for editing.
          return res.send('TODO 404 not found page. need to log in?');
        }

        // TODO include this in page data
        // TODO fill in CI user
        // TODO refactor this out into an interactor.
        //const vizInfo = new VizInfo(vizInfoSnapshot.data);
        //const ownerUserSnapshot = await getUserSnapshot(vizInfo.owner);
        //console.log(ownerUserSnapshot);

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
