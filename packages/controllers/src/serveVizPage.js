import { GetVisualization } from 'vizhub-use-cases';
import { servePage } from './servePage';
import { userIdFromReq } from './userIdFromReq';

const previewUrl = (id) => `/api/visualization/preview/${id}.png`;
export const visualizationRoute = ({ userName, id }) => `/${userName}/${id}`;

export const serveVizPage = (gateways, indexHTML) => {
  const getVisualization = new GetVisualization(gateways);

  return async (req, res) => {
    try {
      const id = req.params.vizId;
      const requestModel = { id, user: userIdFromReq(req) };
      const responseModel = await getVisualization.execute(requestModel);

      const {
        visualization: {
          info: { title, description },
        },
        ownerUser: { userName },
      } = responseModel;

      const meta = {
        title,
        description,
        image: previewUrl(id),
        url: visualizationRoute({ userName, id })
      };
      const servePageMiddleware = servePage(indexHTML, meta)

      return servePageMiddleware(req, res)
    } catch (error) {
      console.error(error.message);
      // In error case, simply serve static index.html with no unfurl metadata.
      // It will show a 404 when it hits the API and the request fails.
      res.send(indexHTML);
    }
  };
};
