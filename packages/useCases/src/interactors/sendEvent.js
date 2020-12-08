import { increment } from 'multiscale-timeseries';

const maxEntries = 1000;

// Sends a new event for recording in the multiscale timeseries analytics store.
// Naming is inspired by Google Analytics 'send' method for event tracking.
export class SendEvent {
  constructor({ eventRecordsGateway }) {
    this.eventRecordsGateway = eventRecordsGateway;
  }

  async execute(requestModel) {
    const { eventIDs, date } = requestModel;

    const records = await this.eventRecordsGateway.getEventRecords(eventIDs);

    const recordsByID = records.reduce(
      (accumulator, record) => ({ ...accumulator, [record.id]: record }),
      {}
    );

    // Fall back to current date if no date was passed in.
    const dateToUse = date || new Date();

    const newEventRecords = eventIDs.map((id) =>
      increment(recordsByID[id] || { id }, dateToUse, maxEntries)
    );

    return await this.eventRecordsGateway.setEventRecords(newEventRecords);
  }
}
