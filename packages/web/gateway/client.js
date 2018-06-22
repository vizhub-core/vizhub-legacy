import ShareDB from '@teamwork/sharedb/lib/client'
import { Gateway } from 'datavis-tech-gateway'
import { Database } from 'datavis-tech-database'

const ClientGateway = () => {
  const socket = new WebSocket('ws://' + window.location.host)
  const connection = new ShareDB.Connection(socket)
  const database = Database(connection)
  return Gateway(database)
}

export default ClientGateway
