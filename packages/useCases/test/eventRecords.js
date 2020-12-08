import assert from 'assert';
import { SendEvent, GetEventRecords } from '../src/index';

const records = {};
const eventRecordsGateway = {
  getEventRecords: async (eventIDs) =>
    eventIDs.map((id) => records[id]).filter((d) => d),
  setEventRecords: async (newEventRecords) => {
    newEventRecords.forEach((newRecord) => {
      records[newRecord.id] = newRecord;
    });
    return 'success';
  },
};

const sendEvent = new SendEvent({ eventRecordsGateway, testing: true });
const getEventRecords = new GetEventRecords({ eventRecordsGateway });

describe('Event Records', () => {
  describe('Send Event', () => {
    it('Should send an event.', async () => {
      const result = await sendEvent.execute({
        eventIDs: ['event', 'event.pageview'],
        date: new Date(Date.UTC(2020, 10, 5)),
      });
      assert.equal(result, 'success');

      // Manually invoke this during testing only.
      // In production, this would happen periodically.
      sendEvent.processQueue();
    });
  });

  describe('Get Event Records', () => {
    it('Should get an event record.', async () => {
      const result = await getEventRecords.execute({
        eventIDs: ['event', 'event.pageview'],
      });

      assert.deepEqual(result, [
        {
          id: 'event',
          minutes: { '2020-11-04T19:00': 1 },
          hours: { '2020-11-04T19': 1 },
          days: { '2020-11-04': 1 },
          weeks: { '2020-W45': 1 },
          months: { '2020-11': 1 },
          quarters: { '2020-Q4': 1 },
          years: { 2020: 1 },
          all: { all: 1 },
        },
        {
          id: 'event.pageview',
          minutes: { '2020-11-04T19:00': 1 },
          hours: { '2020-11-04T19': 1 },
          days: { '2020-11-04': 1 },
          weeks: { '2020-W45': 1 },
          months: { '2020-11': 1 },
          quarters: { '2020-Q4': 1 },
          years: { 2020: 1 },
          all: { all: 1 },
        },
      ]);
    });
  });
});
