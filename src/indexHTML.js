import pkg from '../package.json';
import { encodePageData } from './pageData';

// Stopped using UNPKG due to this issue: https://github.com/mjackson/unpkg/issues/302
//const cdn = 'https://unpkg.com';

const cdn = 'https://cdn.jsdelivr.net/npm';

// Derive the CDN package versions from package.json.
const {
  dependencies: { react },
} = pkg;

// This is only used in the browser, version is defined here only.
const d3Require = '1.2.4';

// TODO get favicon to work by moving built files into public/build
// and including stuff in public/ in the git repo.

// TODO get oembed working
// <link rel="alternate" type="application/json+oembed" href="https://vizhub.com/oembed?url=https://vizhub.com/" title="VizHub - data visualization platform"/>

// TODO tweak meta information per page.
export const indexHTML = ({ title, rootHTML, page, pageProps }) => `<html>
  <head>
    <meta charset="utf-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter&family=Poppins:wght@600&display=swap" rel="stylesheet">

    <title>${title}</title>
    <link rel="shortcut icon" href="favicon.ico" />
    <link rel="manifest" href="manifest.json" crossorigin="use-credentials"/>
    <meta name="viewport" content="width=device-width">
    <link href="/styles.css" rel="stylesheet">

    <meta name="description" content="Learn to code interactive graphics &amp; data visualization with Web technologies!"/>
    <meta name="twitter:url" content="https://vizhub.com/"/>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:site" content="@datavis_tech"/>
    <meta name="twitter:title" content="VizHub - data visualization platform"/>
    <meta name="twitter:description" content="Learn to code interactive graphics &amp; data visualization with Web technologies!"/>
    <meta name="twitter:image" content="https://vizhub.com/images/unfurl-logo.png"/>
    <meta name="twitter:domain" content="vizhub.com"/>
    <meta property="og:url" content="https://vizhub.com/"/>
    <meta property="og:title" content="VizHub - data visualization platform"/>
    <meta property="og:description" content="Learn to code interactive graphics &amp; data visualization with Web technologies!"/>
    <meta property="og:image" content="https://vizhub.com/images/unfurl-logo.png"/>
    <meta property="og:site_name" content="VizHub"/>
    <meta property="og:type" content="article"/>
  </head>
  <body>
    <div id="root">${rootHTML}</div>
    <script src="${cdn}/react@${react}/umd/react.production.min.js"></script>
    <script src="${cdn}/react-dom@${react}/umd/react-dom.production.min.js"></script>
    <script src="${cdn}/d3-require@${d3Require}/dist/d3-require.min.js"></script>
    <script>
      window.pageData = "${encodePageData({ page, pageProps })}";
    </script>
    <script src="/client.js"></script>
  </body>
</html>`;
