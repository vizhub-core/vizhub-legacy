import React, { useContext } from 'react';
import { VizContext, VizContextProvider } from './VizContext';

const Body = () => {
  const { vizInfo } = useContext(VizContext);
  return <div>Hello App! {vizInfo.title}</div>;
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
