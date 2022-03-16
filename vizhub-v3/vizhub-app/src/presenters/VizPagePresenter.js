import React, { useEffect, useState, useMemo, useCallback } from 'react';
import ShareDB from 'sharedb/lib/client';
import { VizPage, Spinner } from '../ui';
import { isClient } from '../isClient';

const useViz = ({ vizInfoSnapshot, vizContentSnapshot }) => {
  // Initialize the viz from server rendered snapshot data.
  const [viz, setViz] = useState({
    vizInfo: vizInfoSnapshot.data,
    vizContent: vizContentSnapshot.data,
  });

  // In the client, connect the viz to real time updates via ShareDB.
  useEffect(() => {
    if (isClient) {
      // TODO wss for prod
      const socket = new WebSocket('ws://' + window.location.host);
      const shareDBConnection = new ShareDB.Connection(socket);

      const { id } = vizInfoSnapshot;
      const vizInfoShareDBDoc = shareDBConnection.get('documentInfo', id);
      const vizContentShareDBDoc = shareDBConnection.get('documentContent', id);

      const logError = (error) => {
        // TODO instrument this to log errors to the server, so they can be traced and fixed
        if (error) console.log(error);
      };

      vizInfoShareDBDoc.ingestSnapshot(vizInfoSnapshot, logError);
      vizInfoShareDBDoc.subscribe(logError);

      vizContentShareDBDoc.ingestSnapshot(vizContentSnapshot, logError);
      vizContentShareDBDoc.subscribe(logError);

      const updateViz = () => {
        setViz({
          vizInfo: VizInfo(vizInfoShareDBDoc.data),
          vizContent: VizContent(vizContentShareDBDoc.data),
        });
      };

      vizContentShareDBDoc.on('op batch', updateViz);
      vizInfoShareDBDoc.on('op batch', updateViz);
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
        //return <pre>{files[activeFileId].text}</pre>;
      }}
    />
  );
};
