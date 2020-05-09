import { ForkVisualization } from 'vizhub-use-cases';
import { userIdFromReq } from '../../userIdFromReq';

export const forkVisualizationController = (expressApp, gateways) => {
  const forkVisualization = new ForkVisualization(gateways);

  expressApp.post('/api/visualization/fork', async (req, res) => {
    try {
      const requestModel = {
        visualization: req.body.visualization,
        owner: userIdFromReq(req),
      };
      const responseModel = await forkVisualization.execute(requestModel);
      res.json(responseModel);
    } catch (error) {
      res.json({ error: error.message });
    }
  });
};
