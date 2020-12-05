import { EVENT_RECORDS } from './collectionName';

export const getEventRecords = (mongoDatabase) => {
  const collection = mongoDatabase.collection(EVENT_RECORDS);
  return async (eventIDs) => {
    const mongoQuery = { id: { $in: eventIDs } };
    const docs = await collection.find(mongoQuery).toArray();
    return docs;
  };
};

export const setEventRecords = (mongoDatabase) => {
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
};
