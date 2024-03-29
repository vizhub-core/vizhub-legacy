import React from 'react';
import { VizContextProvider } from './VizContext';
import { Body } from './Body';

export const VizPage = ({ vizInfoSnapshot, vizContentSnapshot }) => {
  return (
    <VizContextProvider
      vizInfoSnapshot={vizInfoSnapshot}
      vizContentSnapshot={vizContentSnapshot}
    >
      {/*TODO bring this back when we need CodeMirror*/}
      {/*      <SecondaryModulesContextProvider>*/}
      <Body />
      {/*      </SecondaryModulesContextProvider>*/}
    </VizContextProvider>
  );
};
