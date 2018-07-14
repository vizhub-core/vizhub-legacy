import { CreateVisualization } from 'datavis-tech-use-cases';
import { CVPresenter, CVViewModel } from 'datavis-tech-presenters';

export const createVisualizationController = (expressApp, visualizationGateway) => {
  const createVisualization = new CreateVisualization({ visualizationGateway });
  expressApp.get('/api/visualization/create', async (req, res) => {
    try {
      const requestModel = { owner: req.user && req.user.id };
      const responseModel = await createVisualization.execute(requestModel);
      const viewModel = CVPresenter(responseModel);
      res.json(viewModel);
    } catch (error) {
      res.json({ error })
    }
  });
}
