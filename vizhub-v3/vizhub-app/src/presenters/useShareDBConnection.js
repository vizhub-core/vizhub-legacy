import React, { useState, useEffect } from 'react';
import ShareDB from 'sharedb/lib/client';
import { isClient, isProd } from '../environment';

// This hook sets up and exposes a ShareDB connection via WebSocket.
// This is how the client gets real time updates from the server.
// Only applicable to the client, does nothing during SSR.
// See https://share.github.io/sharedb/api/connection
export const useShareDBConnection = () => {
  const [shareDBConnection, setShareDBConnection] = useState(null);

  useEffect(() => {
    if (isClient) {
      setShareDBConnection(
        new ShareDB.Connection(
          new WebSocket(`${isProd ? 'wss' : 'ws'}://${window.location.host}`)
        )
      );
    }
  }, []);

  return shareDBConnection;
};
