import React from 'react';
import { useModule } from '../client/useModule';

const LazyLoadedExample = () => {
  const { Client2 } = useModule('/build/client2.js');
  return Client2 ? <Client2 /> : 'Loading...';
};

const HomePage = ({ vizInfos }) => {
  return (
    <>
      <div
        onClick={() => {
          console.log('clicked');
        }}
      >
        Click test
      </div>
      <div>
        {vizInfos.map(({ title, id }) => (
          <a href={`/todoAddUser/${id}`} key={id}>
            {title}
          </a>
        ))}
      </div>
      <LazyLoadedExample />
    </>
  );
};

const VizPage = ({ title, sanitizedDescriptionHTML }) => {
  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: sanitizedDescriptionHTML }}></div>
    </>
  );
};

const pages = { HomePage, VizPage };

export const App = ({ page, pageProps }) => {
  const Page = pages[page];
  return <Page {...pageProps} />;
};
