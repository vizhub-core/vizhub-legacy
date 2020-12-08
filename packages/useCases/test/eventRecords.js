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

describe.only('Event Records', () => {
  describe('Send Event', () => {
    it('Should send an event.', async () => {
      const result = await sendEvent.execute({
        eventIDs: ['event', 'event.pageview'],
        date: new Date('2020-10-05T14:32:40.441Z'),
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
          minutes: { '2020-10-05T10:32': 1 },
          hours: { '2020-10-05T10': 1 },
          days: { '2020-10-05': 1 },
          weeks: { '2020-W41': 1 },
          months: { '2020-10': 1 },
          quarters: { '2020-Q4': 1 },
          years: { 2020: 1 },
          all: { all: 1 },
        },
        {
          id: 'event.pageview',
          minutes: { '2020-10-05T10:32': 1 },
          hours: { '2020-10-05T10': 1 },
          days: { '2020-10-05': 1 },
          weeks: { '2020-W41': 1 },
          months: { '2020-10': 1 },
          quarters: { '2020-Q4': 1 },
          years: { 2020: 1 },
          all: { all: 1 },
        },
      ]);
    });
  });
});
