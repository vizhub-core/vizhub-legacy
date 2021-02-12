import { GetSearchResultsPageData } from 'vizhub-use-cases';

export const getPublicVisualizationsController = (expressApp, gateways) => {
  const getSearchResultsPageData = new GetSearchResultsPageData(gateways);
  expressApp.post('/api/visualization/get/public', async (req, res) => {
    try {
      const { owner, sort, offset = 0 } = req.body;
      const data = await getSearchResultsPageData.execute({
        offset,
        owner,
        sort,
      });
      res.json(data);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });
};
