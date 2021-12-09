import { GetSearchResultsPageData } from 'vizhub-use-cases';

export const getSearchResultsPageDataController = (expressApp, gateways) => {
  const getSearchResultsPageData = new GetSearchResultsPageData(gateways);
  expressApp.get('/api/visualization/search', async (req, res) => {
    try {
      const data = await getSearchResultsPageData.execute(req.query);
      res.json(data);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });
};
