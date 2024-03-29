import { GetHomePageData } from 'vizhub-use-cases';

export const getHomePageDataController = (expressApp, gateways) => {
  const getHomePageData = new GetHomePageData(gateways);
  expressApp.get('/api/visualization/home', async (req, res) => {
    try {
      const homePageData = await getHomePageData.execute(req.query);
      res.json(homePageData);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });
};
