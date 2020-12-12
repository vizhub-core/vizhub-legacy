import { GetVisualizationInfos } from 'vizhub-use-cases';

export const getVisualizationInfosController = (expressApp, gateways) => {
  const getVisualizationInfos = new GetVisualizationInfos(gateways);
  expressApp.get('/api/visualization/get', async (req, res) => {
    try {
      const visualizationInfos = await getVisualizationInfos.execute(req.query);
      res.json(visualizationInfos);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });
};
