import { sendEventController } from './sendEvent';

export const eventRecordsAPIController = (expressApp, gateways) => {
  sendEventController(expressApp, gateways);
};
