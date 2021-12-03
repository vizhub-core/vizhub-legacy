import React from 'react';
import { renderToString } from 'react-dom/server';
import { VizInfo, App, indexHTML, VizHubError } from 'vizhub-core';
import { VizPage } from './VizPage';

const pageComponent = VizPage;

const { ERR_NOT_FOUND, ERR_PERMISSION_DENIED } = VizHubError.codes;

// TODO make these more elaborate.
const notFoundHTML = 'Not found';
const accessDenied = 'Access denied';

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

        // TODO include this in page data
        // TODO fill in CI user
        // TODO refactor this out into an interactor.
        //const vizInfo = new VizInfo(vizInfoSnapshot.data);
        //const ownerUserSnapshot = await getUserSnapshot(vizInfo.owner);
        //console.log(ownerUserSnapshot);

        res.type('html');
        const pageData = {
          pageName: pageComponent.name,
          pageProps: { vizInfoSnapshot, vizContentSnapshot },
        };
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
        if (error.code === ERR_NOT_FOUND) {
          res.type('html');
          return res.send(notFoundHTML);
        }
        if (error.code === ERR_PERMISSION_DENIED) {
          res.type('html');
          return res.send(accessDenied);
        }

        // Should never happen, but if it does, surface the error clearly.
        console.log(error);
        res.send(error.toString?.());
      }
    });
  },
});
