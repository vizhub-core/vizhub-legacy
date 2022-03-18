import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { VizPage, Spinner } from '../ui';
import { useViz } from './useViz';

const Body = ({
  viz: {
    vizInfo: { title },
    vizContent: { files },
  },
}) => {
  // Compute an alphabetized list of file metadata
  // for use in the editor sidebar.
  const sortedFileMetadata = useMemo(
    () =>
      Object.entries(files)
        .map(([fileId, file]) => ({
          fileId,
          name: file.name,
        }))
        .sort((a, b) => {
          items.sort((a, b) =>
            a.name < b.name ? -1 : a.name > b.name ? 1 : 0
          );
        }),
    [files]
  );

  // This function gets the name of a file
  // for a given file id.
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
        // TODO load CodeMirror async.
        return <Spinner />;
      }}
    />
  );
};

export const VizPagePresenter = ({ pageData }) => {
  const viz = useViz(pageData.vizSnapshot);

  // TODO transition to 404 page,
  // show toast with message 'This viz was deleted';
  return viz ? <Body viz={viz} /> : 'This viz was deleted';
};
