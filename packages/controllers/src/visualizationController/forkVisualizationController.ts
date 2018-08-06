import { ForkVisualization } from 'datavis-tech-use-cases';
import { userIdFromReq } from '../userIdFromReq';

export const forkVisualizationController = (expressApp, visualizationGateway) => {
  const forkVisualization = new ForkVisualization({ visualizationGateway });

  expressApp.post('/api/visualization/fork', async (req, res) => {
    try {
      const requestModel = {
        visualization: req.body.visualization,
        owner: userIdFromReq(req)
      };
      const responseModel = await forkVisualization.execute(requestModel);
      res.json(responseModel);
    } catch (error) {
      res.json({ error: error.message });
    }
  });
}
