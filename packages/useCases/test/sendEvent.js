import assert from 'assert';
import { SendEvent } from '../src/index';

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

describe('Events', () => {
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
      });
      assert.equal(result, 'success');
    });
  });
});
