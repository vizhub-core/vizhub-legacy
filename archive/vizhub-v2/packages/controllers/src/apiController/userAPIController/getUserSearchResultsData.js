import { GetUserSearchResultsData } from 'vizhub-use-cases';

export const getUserSearchResultsDataController = (expressApp, gateways) => {
  const getUserSearchResultsData = new GetUserSearchResultsData(gateways);
  expressApp.get('/api/user/search', async (req, res) => {
    try {
      const data = await getUserSearchResultsData.execute(req.query);
      res.json(data);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });
};
