import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';
import { save } from './save';

export const updateScores = (connection) => async ({ id, scores }) => {
  const info = await fetchShareDBDoc(DOCUMENT_INFO, id, connection);
  return await save(info, { ...info.data, ...scores });
};
