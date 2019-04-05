import { useState, useEffect } from 'react';
import { type as json0 } from 'ot-json0';
const clone = obj => JSON.parse(JSON.stringify(obj));

export const useVizStub = (vizId, vizSnapshots) => {
  const [data, setData] = useState(vizSnapshots[vizId].data);
  const [viz, setViz] = useState();

  useEffect(() => {
    setViz({
      data,
      submitOp: op => {
        setData(clone(json0.apply(data, op)));
      }
    });
  }, [vizId, data]);

  return viz;
};
