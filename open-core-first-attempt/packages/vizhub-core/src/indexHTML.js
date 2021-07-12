import { encodePageData } from './pageData';

// Stopped using UNPKG due to this issue: https://github.com/mjackson/unpkg/issues/302
//const cdn = 'https://unpkg.com';

const cdn = 'https://cdn.jsdelivr.net/npm';

// To check latest version: https://unpkg.com/react
const reactVersion = '17.0.2';

// To check latest version: https://unpkg.com/d3-require
const d3RequireVersion = '1.2.4';

// TODO get favicon to work by moving built files into public/build
// and including stuff in public/ in the git repo.

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

// TODO tweak meta information per page.
export const indexHTML = ({
  title,
  rootHTML,
  pageProps,
  meta = defaultMeta,
}) => `<!DOCTYPE html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="theme-color" content="#f6eee3">

    <link rel="shortcut icon" href="favicon.ico" />
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
    <script src="${cdn}/react@${reactVersion}/umd/react.production.min.js"></script>
    <script src="${cdn}/react-dom@${reactVersion}/umd/react-dom.production.min.js"></script>
    <script src="${cdn}/d3-require@${d3RequireVersion}/dist/d3-require.min.js"></script>
    <script>
      window.pageData = "${encodePageData({ pageProps })}";
    </script>
    <script src="/build/index.js"></script>
  </body>
</html>`;
