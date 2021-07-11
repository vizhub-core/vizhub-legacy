import { getShareDBSnapshot } from './getShareDBSnapshot';
import { indexHTML } from './indexHTML';

export const vizPagePlugin = () => ({
  extendServer: (expressApp, shareDBConnection) => {
    const getVizInfoSnapshot = getShareDBSnapshot(
      shareDBConnection,
      'documentInfo'
    );

    expressApp.get('/:userName/:vizId', async (req, res) => {
      const { vizId } = req.params;

      try {
        const snapshot = await getVizInfoSnapshot(vizId);
        if (snapshot === null) {
          return res.send('TODO 404 not found page. need to log in?');
        }

        // TODO leverage ingestSnapshot in frontend.
        // TODO SSR React
        // TODO SSR React-Router
        //res.send(JSON.stringify(snapshot));
        res.type('html');
        res.send(
          indexHTML({
            title: 'TODO viz title',
            rootHTML: 'TODO render react',
            pageProps: { todo: 'send props' },
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
