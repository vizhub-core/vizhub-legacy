import { CreateDataset } from 'datavis-tech-use-cases';
import { userIdFromReq } from '../userIdFromReq';

export const createDatasetController = (expressApp, datasetGateway) => {
  const createDataset = new CreateDataset({ datasetGateway });

  expressApp.post('/api/dataset/create', async (req, res) => {
    try {
      const owner = userIdFromReq(req);
      const { title, file, sourceName, sourceUrl } = req.body;

      const requestModel = { owner, title, file, sourceName, sourceUrl };
      const responseModel = await createDataset.execute(requestModel);
      res.json(responseModel);
    } catch (error) {
      res.json({ error: error.message });
    }
  });
}
