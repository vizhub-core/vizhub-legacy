import { GetVisualization } from 'datavis-tech-use-cases';
import { visualizationToViewModel } from 'datavis-tech-presenters';

export const getVisualizationController = (expressApp, visualizationGateway) => {
  const getVisualization = new GetVisualization({ visualizationGateway });
  expressApp.get('/api/visualization/get/:id', async (req, res) => {
    try {
      const requestModel = { id: req.params.id };
      const responseModel = await getVisualization.execute(requestModel);
      res.json(responseModel);
    } catch (error) {
      res.json({ error })
    }
  });
}
