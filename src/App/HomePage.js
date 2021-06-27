import React from 'react';
import { useModule } from '../client/useModule';
import { Navigation } from './Navigation';

const LazyLoadedExample = () => {
  const { Client2 } = useModule('/client2.js');
  return Client2 ? <Client2 /> : 'Loading...';
};

export const HomePage = ({ vizInfos }) => {
  return (
    <>
      <Navigation />
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
