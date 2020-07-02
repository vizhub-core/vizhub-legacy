import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';

const forksCountChangeOp = (oldForksCount, newForksCount) =>
  // Initialize the height field if needed.
  [
    {
      p: ['forksCount'],
      oi: +newForksCount,
      od: oldForksCount,
    },
  ];

const submitChangeForksCountOp = (doc, oldForksCount, newForksCount) =>
  new Promise((resolve, reject) => {
    const callback = (error) =>
      error ? reject(error) : resolve({ status: 'success' });

    doc.submitOp(forksCountChangeOp(oldForksCount, newForksCount), callback);
  });

export const incrementForksCount = (connection) => ({ id }) =>
  fetchShareDBDoc(DOCUMENT_INFO, id, connection).then((info) =>
    submitChangeForksCountOp(
      info,
      info.data.forksCount,
      info.data.forksCount + 1
    )
  );

export const decrementForksCount = (connection) => ({ id }) =>
  fetchShareDBDoc(DOCUMENT_INFO, id, connection).then((info) =>{
    if (info.data.forksCount === 0 || info.data.forksCount == null) return;

    submitChangeForksCountOp(
      info,
      info.data.forksCount,
      info.data.forksCount - 1
    )
  });
