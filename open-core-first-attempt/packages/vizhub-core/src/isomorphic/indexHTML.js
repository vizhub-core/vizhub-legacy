import { stringifyPageData } from './stringifyPageData';
import { jsDelivrCombine } from './jsDelivrCombine';

// Fetch React and ReactDOM in a single CDN request.
// See https://www.jsdelivr.com/features#combine

// TODO derive this from package.json?
const reactVersion = '17.0.2';

// The ShareDB client is responsible for real time synchronization.
// https://github.com/curran/sharedb-client-browser
const shareDBClientVersion = '1.2.0';

const libraries = jsDelivrCombine([
  `react@${reactVersion}/umd/react.production.min.js`,
  `react-dom@${reactVersion}/umd/react-dom.production.min.js`,
  `sharedb-client-browser@${shareDBClientVersion}/sharedb-client-browser.min.js`,
]);

// TODO get oembed working
// <link rel="alternate" type="application/json+oembed" href="https://vizhub.com/oembed?url=https://vizhub.com/" title="VizHub - data visualization platform"/>

// TODO remove this, implement it for each page
const defaultMeta = {
  url: 'https://vizhub.com',
  title: 'VizHub - data visualization platform',
  description:
    'Learn to code interactive graphics &amp; data visualization with Web technologies!',
  image: 'https://vizhub.com/images/unfurl-logo.png',
  siteName: 'VizHub',

  // See https://ogp.me/#types
  // TODO use "article" for vizzes
  // TODO use "profile" for user profiles
  type: 'website',
};

// TODO i18n, translations
const locale = 'en-US';

export const indexHTML = ({
  title,
  rootHTML,
  pageData,

  // TODO tweak meta information per page.
  meta = defaultMeta,
}) => `<!DOCTYPE html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="theme-color" content="#f6eee3">
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="manifest" href="/manifest.json" crossorigin="use-credentials"/>
    <link href="/build/styles.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width">
    <meta property="og:url" content="${meta.url}"/>
    <meta property="og:title" content="${meta.title}"/>
    <meta property="og:description" content="${meta.description}"/>
    <meta property="og:image" content="${meta.image}"/>
    <meta property="og:site_name" content="${meta.siteName}"/>
    <meta property="og:locale" content="${locale}" />
    <meta property="og:type" content="${meta.type}"/>
    <meta name="twitter:card" content="summary_large_image"/>
  </head>
  <body>
    <div id="root">${rootHTML}</div>
    <script src="${libraries}"></script>
    <script>window.pageData = ${stringifyPageData(pageData)};</script>
    <script src="/build/client.js"></script>
  </body>
</html>`;
