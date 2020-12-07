import { increment } from 'multiscale-timeseries';

export class GetEventRecords {
  constructor({ eventRecordsGateway }) {
    this.eventRecordsGateway = eventRecordsGateway;
  }

  async execute(requestModel) {
    const { eventIDs } = requestModel;
    return await this.eventRecordsGateway.getEventRecords(eventIDs);
  }
}
