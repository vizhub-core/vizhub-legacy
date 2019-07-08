import { GetPreview } from 'vizhub-use-cases';

export const getPreviewController = (expressApp, gateways) => {
  const getPreview = new GetPreview(gateways);
  expressApp.get('/api/visualization/preview/:id.png', async (req, res) => {
    try {
      const id = req.params.id;
      const requestModel = { id };
      const responseModel = await getPreview.execute(requestModel);
      const preview = responseModel.preview;

      const img = new Buffer(preview, 'base64');

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
      });

      res.end(img); 
    } catch (error) {
      res.json({ error })
    }
  });
}
