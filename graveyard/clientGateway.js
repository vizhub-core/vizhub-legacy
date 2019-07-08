import ShareDB from '@teamwork/sharedb/lib/client';
import { Gateway } from 'vizhub-gateways';
import { Database } from 'vizhub-database';

const ClientGateway = () => {
  const socket = new WebSocket('ws://' + window.location.host);
  const connection = new ShareDB.Connection(socket);
  const database = Database(connection);
  return Gateway(database);
};

export default ClientGateway;
