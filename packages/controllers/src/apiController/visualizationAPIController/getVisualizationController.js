import { GetVisualization } from 'vizhub-use-cases';
import { userIdFromReq } from '../../userIdFromReq';

export const getVisualizationController = (expressApp, gateways) => {
  const getVisualization = new GetVisualization(gateways);
  expressApp.get('/api/visualization/get/:id', async (req, res) => {
    try {
      const requestModel = {
        id: req.params.id,
        user: userIdFromReq(req)
      };
      const responseModel = await getVisualization.execute(requestModel);
      res.json(responseModel);
    } catch (error) {
      res.json({ error: error.message });
    }
  });
};
