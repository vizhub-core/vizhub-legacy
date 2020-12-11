import { GetTemplatesData } from 'vizhub-use-cases';

export const getTemplatesDataController = (expressApp, gateways) => {
  const getTemplatesData = new GetTemplatesData(gateways);
  expressApp.get('/api/visualization/templates', async (req, res) => {
    try {
      const templatesData = await getTemplatesData.execute(req.query);
      res.json(templatesData);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });
};
