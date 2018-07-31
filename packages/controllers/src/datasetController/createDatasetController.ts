import { CreateDataset } from 'datavis-tech-use-cases';
import { userIdFromReq } from '../userIdFromReq';

export const createDatasetController = (expressApp, datasetGateway) => {
  const createDataset = new CreateDataset({ datasetGateway });

  expressApp.get('/api/dataset/create', async (req, res) => {
    console.log(req.body.dataset);
    const owner = userIdFromReq(req);
    const { title, file } = req.body;
    //try {
    //  const requestModel = {
    //    owner,
    //    title,
    //    file
    //  };
    //  const responseModel = await createDataset.execute(requestModel);
    //  res.json(responseModel);
    //} catch (error) {
    //  res.json({ error: error.message });
    //}
  });
}
