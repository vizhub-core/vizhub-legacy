import { GetVisualizationInfo } from 'vizhub-use-cases';

const urlSchema = /^https?:\/\/vizhub.com\/(?<username>.+)\/(?<id>\w+)\/?$/;

export const oembedController = (app, gateways) => {
  app.get('/oembed', async ({ query: { url } }, res) => {
    const validationResults = url && url.match(urlSchema);

    if (validationResults) {
      const { username, id } = validationResults.groups;

      const getVisualizationInfo = new GetVisualizationInfo(gateways);
      const { visualizationInfo } = await getVisualizationInfo.execute({ id });

      if (!visualizationInfo.error) {
        return res.send({
          version: '1.0',
          type: 'rich',

          title: visualizationInfo.title,
          description: visualizationInfo.description,

          provider_name: 'VizHub',
          provider_url: 'https://vizhub.com/',

          html: `<iframe src="https://vizhub.com/${username}/${id}?mode=embed" width="960" height="500" scrolling="no"></iframe>`,
          width: 960,
          height: 500,

          thumbnail_url: `https://vizhub.com/api/visualization/thumbnail/${id}.png`,
          thumbnail_width: 230,
          thumbnail_height: 120,

          cache_age: 3600,
        });
      }
    }

    return res.sendStatus(404);
  });
};
