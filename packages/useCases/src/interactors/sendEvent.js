import { User } from 'vizhub-entities';
import { increment } from 'multiscale-timeseries';
import { GetUser } from './getUser';

const maxEntries = 1000;

// Sends a new event for recording in the multiscale timeseries analytics store.
// Naming is inspired by Google Analytics 'send' method for event tracking.
export class SendEvent {
  constructor({ eventGateway }) {
    this.eventGateway = eventGateway;
  }

  async execute(requestModel) {
    const { eventIDs } = requestModel;

    const date = new Date();

    const records = await this.eventGateway.getRecords(eventIDs);

    const newRecords = records.map((record, i) =>
      increment(record || { id: eventIDs[i] }, date, maxEntries)
    );

    return await this.eventGateway.setRecords(newRecords);
  }
}
