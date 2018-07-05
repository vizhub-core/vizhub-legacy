import { Gateway } from 'datavis-tech-gateways'
import { Database } from 'datavis-tech-database'
import { getConnection } from '../server/shareDB'

export const ServerGateway = () => {
  return Gateway(Database(getConnection()))
}
