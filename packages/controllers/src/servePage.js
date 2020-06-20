import { plainText } from './plainText';

const unfurlPlaceholder = '<meta name="unfurl-all-that:shit" value="please"/>';

const absolute = (relative) => 'https://vizhub.com' + relative;

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

export const servePage = (indexHTML, { title, description, image, url}) => {

  return async (_, res) => {
    try {

      // TODO embed the escaped data into the page
      // TODO find and parse that data in client-side code
      const unfurlHTML = generateUnfurlHTML({
        title,
        descriptionPlainText: plainText(description),
        image: absolute(image),
        url: absolute(url),
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
