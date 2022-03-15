import React, { useContext, useMemo, useCallback } from 'react';
import { VizContext, VizContextProvider } from './VizContext';
import { VizPage, Spinner } from './ui';

const VizPagePresenter = () => {
  const {
    vizInfo: { title },
    vizContent: { files },
  } = useContext(VizContext);

  const sortedFileMetadata = useMemo(
    () =>
      Object.entries(files)
        .map(([vizFileId, vizFile]) => ({
          vizFileId,
          name: vizFile.name,
        }))
        .sort((a, b) => {
          items.sort((a, b) =>
            a.name < b.name ? -1 : a.name > b.name ? 1 : 0
          );
        }),
    [files]
  );

  const getFileName = useCallback(
    (vizFileId) => files[vizFileId].name,
    [files]
  );

  return (
    <VizPage
      title={title}
      sortedFileMetadata={sortedFileMetadata}
      files={files}
      getFileName={getFileName}
      renderCodeEditor={(activeFileId) => {
        return <Spinner />;
        //return <pre>{files[activeFileId].text}</pre>;
      }}
    />
  );
};

export const App = ({ pageData }) => (
  <VizContextProvider
    vizInfoSnapshot={pageData.viz.vizInfo}
    vizContentSnapshot={pageData.viz.vizContent}
  >
    <VizPagePresenter />
  </VizContextProvider>
);
