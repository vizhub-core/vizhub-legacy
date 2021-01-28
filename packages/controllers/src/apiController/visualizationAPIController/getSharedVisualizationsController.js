import { GetSearchResultsPageData } from 'vizhub-use-cases';
import { userIdFromReq } from '../../userIdFromReq';

export const getSharedVisualizationsController = (expressApp, gateways) => {
  const getSearchResultsPageData = new GetSearchResultsPageData(gateways);
  expressApp.post('/api/visualization/get/shared', async (req, res) => {
    try {
      const { offset = 0, userId} = req.body;
      if (!userId) {
        return res.status(400).json({
          error:
            'You need user id to get visualizations that were shared with this user',
        });
      }

      const data = await getSearchResultsPageData.execute({
        offset,
        collaborators: [userId],
        includePrivare: userIdFromReq(req) === userId,
      });
      res.json(data);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });
};
