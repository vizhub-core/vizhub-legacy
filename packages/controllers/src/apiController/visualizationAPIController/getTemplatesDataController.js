import { GetVisualizationInfos } from 'vizhub-use-cases';

export const getVisualizationInfosController = (expressApp, gateways) => {
  const getVisualizationInfos = new GetVisualizationInfos(gateways);
  expressApp.post('/api/visualization/get/info', async (req, res) => {
    try {
      const { offset, ids } = req.body;
      const visualizationInfos = await getVisualizationInfos.execute({
        offset,
        ids,
      });
      res.json(visualizationInfos);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });
};
