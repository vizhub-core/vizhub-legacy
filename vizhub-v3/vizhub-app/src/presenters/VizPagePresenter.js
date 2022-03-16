import React, { useEffect, useState, useMemo, useCallback } from 'react';
import ShareDB from 'sharedb/lib/client';
import {
  VIZ_INFO_COLLECTION,
  VIZ_CONTENT_COLLECTION,
} from 'vizhub-interactors/constants';
import { VizPage, Spinner } from '../ui';
import { isClient } from '../isClient';

export const useViz = ({ vizInfoSnapshot, vizContentSnapshot }) => {
  // Initialize the viz from server rendered snapshot data.
  const [viz, setViz] = useState({
    vizInfo: vizInfoSnapshot.data,
    vizContent: vizContentSnapshot.data,
  });

  const { id } = vizInfoSnapshot.data;

  // In the client, connect the viz to real time updates via ShareDB.
  useEffect(() => {
    if (isClient) {
      // TODO wss for prod
      const socket = new WebSocket('ws://' + window.location.host);
      const shareDBConnection = new ShareDB.Connection(socket);

      const vizInfoDoc = shareDBConnection.get(VIZ_INFO_COLLECTION, id);
      const vizContentDoc = shareDBConnection.get(VIZ_CONTENT_COLLECTION, id);

      const logError = (error) => {
        // TODO instrument this to log errors to the server, so they can be traced and fixed
        if (error) console.log(error);
      };

      vizInfoDoc.ingestSnapshot(vizInfoSnapshot, logError);
      vizInfoDoc.subscribe(logError);

      vizContentDoc.ingestSnapshot(vizContentSnapshot, logError);
      vizContentDoc.subscribe(logError);

      const updateViz = () => {
        setViz({
          vizInfo: vizInfoDoc.data,
          vizContent: vizContentDoc.data,
        });
      };

      vizContentDoc.on('op batch', updateViz);
      vizInfoDoc.on('op batch', updateViz);

      return () => {
        vizContentDoc.off('op batch', updateViz);
        vizInfoDoc.off('op batch', updateViz);
      };
    }
  }, []);

  return viz;
};

export const VizPagePresenter = ({ pageData }) => {
  const {
    vizInfo: { title },
    vizContent: { files },
  } = useViz(pageData.vizSnapshot);

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
      }}
    />
  );
};
