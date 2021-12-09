import { GetDataset } from 'vizhub-use-cases';

export const getDatasetController = (expressApp, gateways) => {
  const getDataset = new GetDataset(gateways);
  expressApp.get('/api/dataset/get/:userName/:slug', async (req, res) => {
    try {
      const { userName, slug } = req.params;
      const requestModel = { userName, slug };
      const responseModel = await getDataset.execute(requestModel);
      res.json(responseModel);
    } catch (error) {
      // TODO unify error handling across the codebase.
      res.json({
        error: {
          message: error.message,
        },
      });
    }
  });

  expressApp.get('/:userName/datasets/:slug.:format', async (req, res) => {
    try {
      const { userName, slug } = req.params;
      const requestModel = { userName, slug };
      const responseModel = await getDataset.execute(requestModel);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      res.send(responseModel.dataset.content.text);
    } catch (error) {
      // TODO unify error handling across the codebase.
      res.json({
        error: {
          message: error.message,
        },
      });
    }
  });
};
