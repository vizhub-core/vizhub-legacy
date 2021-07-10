export const vizPagePlugin = () => ({
  extendServer: (expressApp, shareDBConnection) => {
    expressApp.get('/:userName/:vizId', async (req, res) => {
      const { userName, vizId } = req.params;

      // See https://github.com/share/sharedb/blob/master/examples/counter-json1/server.js
      const shareDBDoc = shareDBConnection.get('documentInfo', vizId);
      shareDBDoc.fetch((error) => {
        if (error) {
          return res.send('TODO error page ' + error);
        }
        if (shareDBDoc.type === null) {
          return res.send('TODO not found page');
        }
        const snapshot = { v: doc.version, data: doc.data, type: doc.type };
        res.send(JSON.stringify(snapshot));
      });
    });
  },
});
