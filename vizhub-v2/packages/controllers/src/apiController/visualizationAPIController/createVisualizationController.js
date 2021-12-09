import { CreateVisualization } from 'vizhub-use-cases';
import { userIdFromReq } from '../../userIdFromReq';

export const createVisualizationController = (expressApp, gateways) => {
  const createVisualization = new CreateVisualization(gateways);

  expressApp.get('/api/visualization/create', async (req, res) => {
    try {
      const requestModel = { owner: userIdFromReq(req) };
      const responseModel = await createVisualization.execute(requestModel);
      res.json(responseModel);
    } catch (error) {
      res.json({ error: error.message });
    }
  });
};
