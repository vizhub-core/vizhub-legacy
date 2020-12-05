import { EVENT_RECORDS } from './collectionName';

export const getEventRecords = (mongoDatabase) => {
  const collection = mongoDatabase.collection(EVENT_RECORDS);
  return (eventIDs) => {
    const mongoQuery = { id: { $in: eventIDs } };
    console.log('here');
    console.log(mongoQuery);
    return new Promise((resolve, reject) => {
      collection.find(mongoQuery).toArray((err, docs) => {
        if (err) return reject(err);
        console.log('Found the following records');
        console.log(docs);
        resolve(docs);
      });
    });
  };
};

export const setEventRecords = getEventRecords;
