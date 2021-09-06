import React from 'react';
import { renderToString } from 'react-dom/server';
import { VizInfo, App, indexHTML } from 'vizhub-core';
import { VizPage } from '../VizPage';

const pageComponent = VizPage;

export const vizPageServerPlugin = () => ({
  pageComponent,
  extendServer: ({ expressApp, pages, gateways }) => {
    const { getVizInfoSnapshot, getVizContentSnapshot, getUserSnapshot } =
      gateways;

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
            rootHTML: renderToString(
              <App pageData={pageData} pages={pages} ssrQuery={req.query} />
            ),
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
