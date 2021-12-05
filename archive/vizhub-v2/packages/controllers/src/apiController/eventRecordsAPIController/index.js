import { sendEventController } from './sendEvent';
import { getEventRecordsController } from './getEventRecords';

export const eventRecordsAPIController = (expressApp, gateways) => {
  sendEventController(expressApp, gateways);
  getEventRecordsController(expressApp, gateways);
};
