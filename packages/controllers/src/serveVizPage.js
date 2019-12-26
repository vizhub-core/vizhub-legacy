import path from 'path';
import { GetVisualization } from 'vizhub-use-cases';
import { userIdFromReq } from './userIdFromReq';
import { plainText } from './plainText';

const unfurlPlaceholder = '<meta name="unfurl-all-that:shit" value="please"/>';
//const unfurlPlaceholder = /<meta name="unfurl-all-that:shit" value="please"\/>/;

const absolute = relative => 'https://vizhub.com' + relative;
const previewUrl = id => `/api/visualization/preview/${id}.png`;
export const visualizationRoute = ({ userName, id }) => `/${userName}/${id}`;

const generateUnfurlHTML = ({ title, descriptionPlainText, image, url }) => `
  <meta name="twitter:url" value="${url}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" value="@datavis_tech" />
  <meta name="twitter:title" value="${title}" />
  <meta name="twitter:description" value="${descriptionPlainText}" />
  <meta name="twitter:image" content="${image}" />
  <meta name="twitter:domain" value="vizhub.com" />
  <meta property="og:url" content="${url}"/>
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${descriptionPlainText}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:site_name" content="VizHub" />
`;

export const serveVizPage = (gateways, indexHTML) => {
  const getVisualization = new GetVisualization(gateways);

  return async (req, res) => {
    try {
      const id = req.params.vizId;
      const requestModel = { id, user: userIdFromReq(req) };
      const responseModel = await getVisualization.execute(requestModel);

      const {
        visualization: {
          info: { title, description }
        },
        ownerUser: { userName }
      } = responseModel;

      // TODO embed the escaped data into the page
      // TODO find and parse that data in client-side code
      const unfurlHTML = generateUnfurlHTML({
        title,
        descriptionPlainText: plainText(description),
        image: absolute(previewUrl(id)),
        url: absolute(visualizationRoute({ userName, id }))
      });

      res.send(indexHTML.replace(unfurlPlaceholder, unfurlHTML));
    } catch (error) {
      console.error(error.message);
      // In error case, simply serve static index.html with no unfurl metadata.
      // It will show a 404 when it hits the API and the request fails.
      res.send(indexHTML);
    }
  };
};
