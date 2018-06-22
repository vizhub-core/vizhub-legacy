import { Gateway } from 'datavis-tech-gateway'
import { Database } from 'datavis-tech-database'
import ShareDB from '@teamwork/sharedb/lib/client'

const socket = new WebSocket('ws://' + window.location.host)
const connection = new ShareDB.Connection(socket)

const database = Database(connection)
const gateway = Gateway(database)

export default gateway
