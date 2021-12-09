import { plainText } from './plainText';
import { sanitize } from './sanitize';

const titlePlaceholder = '<title>VizHub</title>';
const unfurlPlaceholder = '<meta name="unfurl-all-that:shit" value="please"/>';
const absolute = (relative) => 'https://vizhub.com' + relative;

const generateUnfurlHTML = ({ title, descriptionPlainText, image, url }) =>
  `<link rel="alternate" type="application/json+oembed" href="${absolute(
    '/oembed'
  )}?url=${url}" title="${title}"/>
<meta name="description" content="${descriptionPlainText}"/>
<meta name="twitter:url" content="${url}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:site" content="@datavis_tech"/>
<meta name="twitter:title" content="${title}"/>
<meta name="twitter:description" content="${descriptionPlainText}"/>
<meta name="twitter:image" content="${image}"/>
<meta name="twitter:domain" content="vizhub.com"/>
<meta property="og:url" content="${url}"/>
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${descriptionPlainText}"/>
<meta property="og:image" content="${image}"/>
<meta property="og:site_name" content="VizHub"/>
<meta property="og:type" content="article"/>`.replace(/\n/g, '');

export const servePage = (indexHTML, { title, description, image, url }) => {
  return async (_, res) => {
    try {
      const titleSanitized = sanitize(title);
      // TODO embed the escaped data into the page
      // TODO find and parse that data in client-side code
      const unfurlHTML = generateUnfurlHTML({
        title: titleSanitized,
        descriptionPlainText: plainText(description),
        image: absolute(image),
        url: absolute(url),
      });

      // Set the content of the <title> tag.
      const indexHTMLWithTitle = indexHTML.replace(
        titlePlaceholder,
        `<title>${titleSanitized}</title>`
      );

      // Add the unfurl meta tags.
      const indexHTMLWithUnfurl = indexHTMLWithTitle.replace(
        unfurlPlaceholder,
        unfurlHTML
      );

      res.send(indexHTMLWithUnfurl);
    } catch (error) {
      console.error(error.message);
      // In error case, simply serve static index.html with no unfurl metadata.
      // It will show a 404 when it hits the API and the request fails.
      res.send(indexHTML);
    }
  };
};
