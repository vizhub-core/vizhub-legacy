import React from 'react';
import { VizContextProvider } from './VizContext';
import { Body } from './Body';

export const VizPage = ({ vizInfoSnapshot }) => {
  return (
    <VizContextProvider vizInfoSnapshot={vizInfoSnapshot}>
      <Body />
    </VizContextProvider>
  );

  //  return <div>{vizInfoSnapshot.data.title}</div>;
};
