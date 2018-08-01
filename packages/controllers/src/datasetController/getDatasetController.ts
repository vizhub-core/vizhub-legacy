import { GetDataset } from 'datavis-tech-use-cases';

export const getDatasetController = (expressApp, datasetGateway) => {
  const getDataset = new GetDataset({ datasetGateway });
  expressApp.get('/api/dataset/get/:slug', async (req, res) => {
    try {
      const requestModel = { slug: req.params.slug };
      const responseModel = await getDataset.execute(requestModel);
      res.json(responseModel);
    } catch (error) {
      // TODO unify error handling across the codebase.
      res.json({
        error: {
          message: error.message
        }
      });
    }
  });
}
