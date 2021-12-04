import { useState } from 'react';
import { type as json0 } from 'ot-json0';
const clone = obj => JSON.parse(JSON.stringify(obj));

export const useVizStub = (vizId, vizSnapshots) => {
  const [vizData, setVizData] = useState(vizSnapshots[vizId].data);

  const submitVizOp = op => {
    setVizData(clone(json0.apply(vizData, op)));
  };

  // Intentionally different from the ShareDB API,
  // to decouple application logic from ShareDB.
  return { vizData, submitVizOp };
};
