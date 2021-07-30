import React from 'react';
import { VizContextProvider } from './VizContext';
import { SecondaryModulesContextProvider } from './SecondaryModulesContext';
import { Body } from './Body';

export const VizPage = ({ vizInfoSnapshot, vizContentSnapshot }) => {
  return (
    <VizContextProvider
      vizInfoSnapshot={vizInfoSnapshot}
      vizContentSnapshot={vizContentSnapshot}
    >
      <SecondaryModulesContextProvider>
        <Body />
      </SecondaryModulesContextProvider>
    </VizContextProvider>
  );
};
