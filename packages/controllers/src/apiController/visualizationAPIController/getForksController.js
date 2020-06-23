import { GetForks } from 'vizhub-use-cases';

export const getForksController = (expressApp, gateways) => {
  const getForks = new GetForks(gateways);
  expressApp.get('/api/visualization/get/:id/forks', async (req, res) => {
    try {
      const requestModel = {
        forkedFrom: req.params.id,
        offset: req.query.offset,
      };

      const data = await getForks.execute(requestModel);
      res.json(data);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });
};
