import ShareDB from '@teamwork/sharedb';
import ShareDBMingoMemory from '@teamwork/sharedb-mingo-memory';
import { Gateway } from 'datavis-tech-gateway'
import { Database } from 'datavis-tech-database'

const ServerGateway = () => {
  const shareDB = ShareDB({ db: new ShareDBMingoMemory() });
  const connection = shareDB.connect(); 
  const database = Database(connection)
  return Gateway(database)
}

export default ServerGateway
