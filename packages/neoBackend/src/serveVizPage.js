import path from 'path';
import fs from 'fs';
import template from 'lodash.template';

const indexHTMLPath = path.join(__dirname, '..', 'build', 'index.html');
const indexHTML = fs.readFileSync(indexHTMLPath, 'utf8');

const unfurlPlaceholder = '<meta name="unfurl-all-that:shit" value="please"/>';

const absolute = relative => 'https://vizhub.com' + relative;
const previewUrl = id => `/api/visualization/preview/${id}.png`;
export const visualizationRoute = ({userName, id}) =>
  `/${userName}/${id}`;

const generateUnfurlHTML = ({ title, description, image, url }) => `
  <meta name="twitter:url" value="${url}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" value="@datavis_tech" />
  <meta name="twitter:title" value="${title}" />
  <meta name="twitter:description" value="${description}" />
  <meta name="twitter:image" content="${image}" />
  <meta name="twitter:domain" value="vizhub.com" />

  <meta property="og:url" content="${url}"/>
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:site_name" content="VizHub"/>
`;

export const serveVizPage = (req, res) => {
  console.log('Serving a Viz page');

  // TODO fetch viz data here
  const title = 'thetitle';
  const description = 'thedes';
  const id = 'theid';
  const userName = 'theusername';

  // generate unfurl tags from it
  // embed the escaped data into the page
  // find and parse that data in client-side code
  const unfurlHTML = generateUnfurlHTML({
    title,
    description,
    image: absolute(previewUrl(id)),
    url: absolute(visualizationRoute({userName, id}))
  });
  console.log(unfurlPlaceholder);
  console.log(unfurlHTML);
  res.send(indexHTML.replace(unfurlPlaceholder, unfurlHTML));
};
