import { useEffect, useState, useContext, useRef } from 'react';
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

  // Establish connection for the first time.
  // Wait for auth to resolve so that we can keep track of when
  // authenticated user diverges from the user that the backend
  // recorded as authenticated when the connection was established.
  useEffect(() => {
    if (realtimeModules && !connection && me !== AUTH_PENDING) {
      //console.log('initializing connection');
      connectedUser.current = me;
      const newConnection = new realtimeModules.Connection(createWebSocket());

      // TODO user flow for editing unforked vizzes
      // This is a temporary measure, with suboptimal UX.
      // Currently, the user cannot edit without forking.
      // Ideally, the user could edit without forking,
      // then fork to save those edits.
      newConnection.on('error', error => {
        setWarning(error.message);
      });

      setConnection(newConnection);
    }
  }, [realtimeModules, connection, me, setWarning]);

  // Re-establish WebSocket when authenticated user changes.
  // Since backend access control is based on user at connection time,
  // access control would not be synchronized with the frontend without this.
  // (the user would need to manually refresh the page to be able to edit).
  useEffect(() => {
    if (!connection) return;
    if (me !== connectedUser.current && me !== AUTH_PENDING) {
      connectedUser.current = me;

      // Clear out existing warning, if any.
      setWarning(null);

      connection.close();
      // TODO clean this shit up.
      // Figure out how to listen for the right event
      // to open the connection immediately after closing.
      // This 100ms timout was added to avoid an error
      // about transitioning directly from connected to connecting.
      setTimeout(() => {
        connection.bindToSocket(createWebSocket());
      }, 100);
    }
  }, [connection, me, connectedUser, setWarning]);

  return connection;
};
