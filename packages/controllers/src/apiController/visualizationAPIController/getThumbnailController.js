import { GetThumbnail } from 'datavis-tech-use-cases';

export const getThumbnailController = (expressApp, gateways) => {
  const getThumbnail = new GetThumbnail(gateways);
  expressApp.get('/api/visualization/thumbnail/:id.png', async (req, res) => {
    try {
      const id = req.params.id;
      const requestModel = { id };
      const responseModel = await getThumbnail.execute(requestModel);
      const thumbnail = responseModel.thumbnail;

      const img = new Buffer(thumbnail, 'base64');

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
