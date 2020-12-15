import { GetVisualizationInfos } from 'vizhub-use-cases';
import cors from 'cors';

// Enable hitting this endpoint during development.
const corsOptions = {
  origin: 'http://localhost:3000',
};

export const getVisualizationInfosController = (expressApp, gateways) => {
  const getVisualizationInfos = new GetVisualizationInfos(gateways);
  expressApp.options('/api/visualization/get/info', cors(corsOptions));
  expressApp.post(
    '/api/visualization/get/info',
    cors(corsOptions),
    async (req, res) => {
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
    }
  );
};
