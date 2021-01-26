import { GetSearchResultsPageData } from 'vizhub-use-cases';

export const getSharedVisualizationsController = (expressApp, gateways) => {
  const getSearchResultsPageData = new GetSearchResultsPageData(gateways);
  expressApp.post('/api/visualization/get/shared', async (req, res) => {
    try {
      const { offset = 0, collaborators = [] } = req.body;
      const data = await getSearchResultsPageData.execute({
        offset,
        collaborators,
      });
      res.json(data);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });
};
