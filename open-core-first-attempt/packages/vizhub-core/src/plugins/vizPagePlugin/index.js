import React from 'react';
import { renderToString } from 'react-dom/server';
import { VizInfo } from '../../entities/VizInfo';
import { getShareDBSnapshot } from '../../getShareDBSnapshot';
import { indexHTML } from '../../indexHTML';
import { VizPage } from './VizPage';

export const vizPagePlugin = () => ({
  extendServer: (expressApp, shareDBConnection) => {
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
        console.log('vizInfo');
        const { title } = vizInfo;

        // TODO SSR React-Router
        // TODO leverage ingestSnapshot in frontend.

        const rootHTML = renderToString(<VizPage vizInfo={vizInfo} />);
        const pageData = { vizInfoSnapshot };

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
