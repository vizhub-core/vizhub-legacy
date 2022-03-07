import React, { useContext } from 'react';
import { VizContext, VizContextProvider } from './VizContext';
import { VizPage } from 'vizhub-ui';

const Body = () => {
  const { vizInfo } = useContext(VizContext);
  return <VizPage />
};

export const App = ({ pageData }) => {
  return (
    <VizContextProvider
      vizInfoSnapshot={pageData.viz.vizInfo}
      vizContentSnapshot={pageData.viz.vizContent}
    >
      <Body />
    </VizContextProvider>
  );
};
