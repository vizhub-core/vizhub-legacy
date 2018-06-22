import ClientGateway from './client'

let gateway

export const getGateway = () => {
  if (!gateway) {
    if (process.browser) {
      gateway = ClientGateway()
    } else {

      // Dynamic require so it doesn't end up in the client bundle.
      gateway = require('./server').ServerGateway()
    }
  }
  return gateway
}
