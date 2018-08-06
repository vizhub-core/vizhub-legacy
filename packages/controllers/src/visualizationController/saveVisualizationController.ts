import { SaveVisualization } from 'datavis-tech-use-cases';
import { userIdFromReq } from '../userIdFromReq';

export const saveVisualizationController = (expressApp, visualizationGateway) => {
  const saveVisualization = new SaveVisualization({ visualizationGateway });

  expressApp.post('/api/visualization/save', async (req, res) => {
    try {
      const requestModel = {
        visualization: req.body.visualization,
        userId: userIdFromReq(req)
      };
      const responseModel = await saveVisualization.execute(requestModel);
      res.json(responseModel);
    } catch (error) {
      res.json({ error: error.message })
    }
  });
}
