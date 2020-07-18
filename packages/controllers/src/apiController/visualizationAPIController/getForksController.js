import { GetForksPageData } from 'vizhub-use-cases';
import { userIdFromReq } from '../../userIdFromReq';

export const getForksController = (expressApp, gateways) => {
  const getForksPageData = new GetForksPageData(gateways);

  expressApp.get('/api/visualization/get/:id/forks', async (req, res) => {
    try {
      const requestModel = {
        id: req.params.id,
        offset: req.query.offset,
        owner: userIdFromReq(req),
      };

      const data = await getForksPageData.execute(requestModel);
      res.json(data);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });
};
