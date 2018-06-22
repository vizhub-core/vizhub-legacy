import ShareDB from '@teamwork/sharedb';
import ShareDBMingoMemory from '@teamwork/sharedb-mingo-memory';
import { Gateway } from 'datavis-tech-gateway'
import { Database } from 'datavis-tech-database'

export const ServerGateway = () => {
  const shareDB = ShareDB({ db: new ShareDBMingoMemory() });
  const connection = shareDB.connect(); 
  const database = Database(connection)
  return Gateway(database)
}
