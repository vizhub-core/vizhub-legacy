import assert from 'assert';
import { SendEvent, GetEventRecords } from '../src/index';

const records = {};
const eventGateway = {
  getRecords: async (eventIDs) => eventIDs.map((id) => records[id]),
  setRecords: async (newRecords) => {
    newRecords.forEach((newRecord) => {
      records[newRecord.id] = newRecord;
    });
    return 'success';
  },
};

const sendEvent = new SendEvent({ eventGateway });
const getEventRecords = new GetEventRecords({ eventGateway });

describe('Event Records', () => {
  describe('Send Event', () => {
    it('Should send an event.', async () => {
      const result = await sendEvent.execute({
        eventIDs: [
          'event',
          'event.pageview',
          'event.pageview.viz',
          'event.pageview.viz.user:75849375',
          'event.pageview.viz.user:75849375.viz:475483',
        ],
        date: new Date('2020-10-05T14:32:40.441Z'),
      });
      assert.equal(result, 'success');
    });
  });

  describe('Get Event Records', () => {
    it('Should get an event record.', async () => {
      const result = await getEventRecords.execute({
        eventIDs: [
          'event',
          'event.pageview',
          'event.pageview.viz',
          'event.pageview.viz.user:75849375',
          'event.pageview.viz.user:75849375.viz:475483',
        ],
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
        },
        {
          id: 'event.pageview.viz',
          minutes: { '2020-10-05T10:32': 1 },
          hours: { '2020-10-05T10': 1 },
          days: { '2020-10-05': 1 },
          weeks: { '2020-W41': 1 },
          months: { '2020-10': 1 },
          quarters: { '2020-Q4': 1 },
          years: { 2020: 1 },
        },
        {
          id: 'event.pageview.viz.user:75849375',
          minutes: { '2020-10-05T10:32': 1 },
          hours: { '2020-10-05T10': 1 },
          days: { '2020-10-05': 1 },
          weeks: { '2020-W41': 1 },
          months: { '2020-10': 1 },
          quarters: { '2020-Q4': 1 },
          years: { 2020: 1 },
        },
        {
          id: 'event.pageview.viz.user:75849375.viz:475483',
          minutes: { '2020-10-05T10:32': 1 },
          hours: { '2020-10-05T10': 1 },
          days: { '2020-10-05': 1 },
          weeks: { '2020-W41': 1 },
          months: { '2020-10': 1 },
          quarters: { '2020-Q4': 1 },
          years: { 2020: 1 },
        },
      ]);
    });
  });
});
