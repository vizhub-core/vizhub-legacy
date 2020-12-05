import { EVENT_RECORDS } from './collectionName';

export const getEventRecords = (mongoDatabase) => {
  if (mongoDatabase) {
    const collection = mongoDatabase.collection(EVENT_RECORDS);
    return async (eventIDs) => {
      const mongoQuery = { id: { $in: eventIDs } };
      const docs = await collection.find(mongoQuery).toArray();
      return docs;
    };
  } else {
    // Do nothing in development environments with no MongoDB.
    return async () => [];
  }
};

export const setEventRecords = (mongoDatabase) => {
  if (mongoDatabase) {
    const collection = mongoDatabase.collection(EVENT_RECORDS);
    return async (newEventRecords) => {
      await collection.bulkWrite(
        newEventRecords.map((newRecord) => ({
          replaceOne: {
            filter: { id: newRecord.id },
            replacement: newRecord,
            upsert: true,
          },
        }))
      );
      return 'success';
    };
  } else {
    // Do nothing in development environments with no MongoDB.
    return async () =>
      'success (no-op during development, no MongoDB connection)';
  }
};
