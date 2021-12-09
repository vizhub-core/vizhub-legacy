import { DeleteVisualization } from 'vizhub-use-cases';
import { userIdFromReq } from '../../userIdFromReq';

export const deleteVisualizationController = (expressApp, gateways) => {
  const deleteVisualization = new DeleteVisualization(gateways);

  expressApp.post('/api/visualization/delete', async (req, res) => {
    try {
      const requestModel = {
        id: req.body.id,
        userId: userIdFromReq(req),
      };
      const responseModel = await deleteVisualization.execute(requestModel);
      res.json(responseModel);
    } catch (error) {
      res.json({
        error: error.message,
      });
    }
  });
};
