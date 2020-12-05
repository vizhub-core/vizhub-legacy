import { User } from 'vizhub-entities';
import { EVENT_RECORDS } from './collectionName';

export const getEventRecords = () => async (ids) => {
  try {
    const mongoQuery = {
      id: { $in: ids },
    };
    const eventRecords = await fetchMongoQuery(USER, mongoQuery);
    console.log(eventRecords);
    return eventRecords;
  } catch (error) {
    console.log(error);
    return null;
  }
};
