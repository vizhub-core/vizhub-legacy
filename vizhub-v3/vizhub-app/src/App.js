import React, { useContext } from 'react';
import { VizContext, VizContextProvider } from './VizContext';
import { VizPage } from 'vizhub-ui';

console.log('VizPage');
console.log(VizPage);

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
