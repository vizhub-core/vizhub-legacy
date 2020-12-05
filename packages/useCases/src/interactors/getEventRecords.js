import { increment } from 'multiscale-timeseries';

export class GetEventRecords {
  constructor({ eventGateway }) {
    this.eventGateway = eventGateway;
  }

  async execute(requestModel) {
    const { eventIDs } = requestModel;
    return await this.eventGateway.getRecords(eventIDs);
  }
}
