import { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { AuthContext, AUTH_PENDING } from '../../../authentication';
import { WarningContext } from '../WarningContext';
import { RealtimeModulesContext } from '../RealtimeModulesContext';
import { createWebSocket } from './createWebSocket';

export const useConnection = () => {
  const realtimeModules = useContext(RealtimeModulesContext);
  const { me } = useContext(AuthContext);
  const { setWarning } = useContext(WarningContext);
  const [connection, setConnection] = useState();
  const connectedUser = useRef();
  const reconnect = useRef();
  const reconnectAttemptCount = useRef(0);

  const onOpen = useCallback(() => {
    reconnectAttemptCount.current = 0;
  }, []);

  const onClose = useCallback(
    (event) => {
      if (!event.wasClean) {
        reconnectAttemptCount.current++;
        let countdown = 5;
        const updateWarning = () => {
          // Don't display warning on first reconnection attempt
          // because it turns out WebSocket disconnections happen
          // all the time (routinely, regularly) and showing a warning
          // every time is super annoying. Usually the routine disconnections
          // can be re-connected on the first attempt - so do this
          // "in the background" without telling the user.
          //
          // This way, we only show a warning after the first reconnection
          // attempt fails - this indicates that the network is actually down,
          // and the user should know about it at this point.
          if (reconnectAttemptCount.current > 1) {
            setWarning('Connection lost. Reconnecting in ' + countdown);
          }
        };
        updateWarning();
        const interval = setInterval(() => {
          countdown--;
          updateWarning();
          if (countdown === 0) {
            clearInterval(interval);
            setWarning(null);
            reconnect.current();
          }
        }, 1000);
      }
    },
    [setWarning]
  );

  const onError = useCallback((error) => {
    console.log('WebSocket error:');
    console.error(error);
  }, []);

  const openWebSocket = useCallback(
    () => createWebSocket({ onClose, onOpen, onError }),
    [onClose, onOpen, onError]
  );

  reconnect.current = useCallback(() => {
    connection.bindToSocket(openWebSocket());
  }, [connection, openWebSocket]);

  // Establish connection for the first time.
  // Wait for auth to resolve so that we can keep track of when
  // authenticated user diverges from the user that the backend
  // recorded as authenticated when the connection was established.
  useEffect(() => {
    if (realtimeModules && !connection && me !== AUTH_PENDING) {
      //console.log('initializing connection');
      connectedUser.current = me;
      const newConnection = new realtimeModules.Connection(openWebSocket());

      // If the user is not authenticated,
      // or is trying to edit a viz that belongs to someone else,
      newConnection.on('error', (error) => {
        // show them the error,
        setWarning(error.message);

        // but also allow them to make edits without forking.
        // Their edits are not synched to the server, but are kept in memory.
        // The edited version will be saved if the user does fork.
        newConnection.close();
      });

      setConnection(newConnection);
    }
  }, [realtimeModules, connection, me, setWarning, openWebSocket]);

  // Re-establish WebSocket when authenticated user changes.
  // Since backend access control is based on user at connection time,
  // access control would not be synchronized with the frontend without this.
  // (the user would need to manually refresh the page to be able to edit).
  useEffect(() => {
    if (!connection) return;
    if (me !== connectedUser.current && me !== AUTH_PENDING) {
      connectedUser.current = me;

      connection.close();

      // Clear out existing warning, if any.
      setWarning(null);

      // This 100ms polling for disconnected state was added to avoid an error
      // about transitioning directly from connected to connecting.
      // Not able to reproduce in development, but in production, sometimes
      // the connection state is 'connected', even after we invoked connection.close().
      // It seems to happen when authenticating, when the tab that runs this code is in the background.
      let pollCount = 0;
      const poll = () => {
        setTimeout(() => {
          if (connection.state !== 'connected') {
            reconnect.current();
          } else {
            pollCount++;
            if (pollCount > 100) {
              // Bail after 10 seconds, something went horribly wrong.
              console.error(
                'WebSocket connection did not close as it should have.'
              );
            } else {
              poll();
            }
          }
        }, 100);
      };
      poll();
    }
  }, [connection, me, connectedUser, setWarning, onClose]);

  // Expose connection to end-to-end tests,
  // so they can test ShareDB middleware directly.
  if (process.env.NODE_ENV === 'development') {
    window.shareDBConnection = connection;
  }

  return connection;
};
