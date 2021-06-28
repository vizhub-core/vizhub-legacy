import React from 'react';
import { useModule } from '../../client/useModule';

const LazyLoadedExample = () => {
  const { Client2 } = useModule('/client2.js');
  return Client2 ? <Client2 /> : 'Loading...';
};

// Demonstrates that:
//  * SSR is working
//  * Interactivity is present (click test)
//  * Dynamic imports are working (LazyLoadedExample)
export const SanityCheckPage = () => (
  <>
    {' '}
    <div
      onClick={() => {
        console.log('clicked');
      }}
    >
      Click test
    </div>
    <LazyLoadedExample />
  </>
);
