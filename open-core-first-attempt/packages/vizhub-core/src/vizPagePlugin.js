export const vizPagePlugin = () => {
  return {
    extendServer: (expressApp) => {
      expressApp.get('/:userName/:vizId', async (req, res) => {
        const { userName, vizId } = req.params;
        res.send('Get viz ' + vizId);
      });
    },
  };
};
