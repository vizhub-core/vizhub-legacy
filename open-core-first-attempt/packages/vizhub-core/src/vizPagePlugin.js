// Gets a current snapshot of a ShareDB document.
const getSnapshot = (shareDBConnection, collectionName) => (id) =>
  new Promise((resolve, reject) => {
    // See https://github.com/share/sharedb/blob/master/examples/counter-json1/server.js
    const shareDBDoc = shareDBConnection.get(collectionName, id);
    shareDBDoc.fetch((error) => {
      if (error) {
        return reject(error);
      }
      if (shareDBDoc.type === null) {
        return resolve(null);
      }
      const { version, data, type } = shareDBDoc;
      const snapshot = { v: version, data, type };
      resolve(snapshot);
    });
  });

export const vizPagePlugin = () => ({
  extendServer: (expressApp, shareDBConnection) => {
    const getVizInfoSnapshot = getSnapshot(shareDBConnection, 'documentInfo');

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
        res.send(JSON.stringify(snapshot));
      } catch (error) {
        // Should never happen, but if it does, surface the error clearly.
        console.log(error);
        res.send(error.toString?.());
      }
    });
  },
});
