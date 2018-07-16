import { CreateVisualization } from 'datavis-tech-use-cases';

export const createVisualizationController = (expressApp, visualizationGateway) => {
  const createVisualization = new CreateVisualization({ visualizationGateway });

  expressApp.get('/api/visualization/create', async (req, res) => {
    try {
      const requestModel = { owner: req.user && req.user.id };
      const responseModel = await createVisualization.execute(requestModel);
      res.json(responseModel);
    } catch (error) {
      res.json({ error: error.message });
    }
  });
}
