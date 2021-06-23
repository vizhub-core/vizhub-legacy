import React from 'react';
import { useModule } from '../client/useModule';

const HomePage = () => {
  const { Client2 } = useModule('/build/client2.js');

  return (
    <div
      onClick={() => {
        console.log('clicked');
      }}
    >
      Hello React JSX
      {Client2 ? <Client2 /> : 'Loading...'}
    </div>
  );
};

const VizPage = ({ viz }) => {
  return <div>Viz page ${JSON.stringify(viz)}</div>;
};

const pages = { HomePage, VizPage };

export const App = ({ page, pageProps }) => {
  const Page = pages[page];
  return <Page {...pageProps} />;
};
