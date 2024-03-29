import { ExportVisualization } from 'vizhub-use-cases';

export const exportVisualizationController = (expressApp, gateways) => {
  const exportVisualization = new ExportVisualization(gateways);
  expressApp.get('/api/visualization/export/:id', async (req, res) => {
    try {
      const requestModel = { id: req.params.id };
      const responseModel = await exportVisualization.execute(requestModel);

      const { zipFileBuffer, zipFileName } = responseModel;

      res.type('zip');
      res.attachment(zipFileName);
      res.send(zipFileBuffer);
    } catch (error) {
      res.json({ error });
    }
  });
};
