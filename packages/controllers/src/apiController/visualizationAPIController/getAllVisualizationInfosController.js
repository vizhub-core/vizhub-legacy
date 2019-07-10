import { GetAllVisualizationInfos } from 'vizhub-use-cases';

export const getAllVisualizationInfosController = (expressApp, gateways) => {
  const getAllVisualizationInfos = new GetAllVisualizationInfos(gateways);
  expressApp.get('/api/visualization/metadata', async (req, res) => {
    try {
      const { visualizationInfos } = await getAllVisualizationInfos.execute();
      res.json(visualizationInfos);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });
};
