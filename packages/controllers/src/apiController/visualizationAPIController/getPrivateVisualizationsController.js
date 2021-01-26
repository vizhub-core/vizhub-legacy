import { GetSearchResultsPageData } from 'vizhub-use-cases';
import { userIdFromReq } from '../../userIdFromReq';

export const getPrivateVisualizationsController = (expressApp, gateways) => {
  const getSearchResultsPageData = new GetSearchResultsPageData(gateways);
  expressApp.post('/api/visualization/get/private', async (req, res) => {
    try {
      const { owner, offset = 0 } = req.body;
      if (userIdFromReq(req) !== owner) {
        return res
          .status(403)
          .json({ error: 'Getting private visualizations is allowed only for visualizations owner' });
      }

      const data = await getSearchResultsPageData.execute({
        offset,
        owner,
        onlyPrivate: true
      });
      res.json(data);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });
};
