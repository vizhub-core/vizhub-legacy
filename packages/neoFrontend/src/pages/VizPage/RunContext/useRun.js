import { useEffect, useContext, useState } from 'react';
import { VizContext } from '../VizContext';
import { useValue } from '../../../useValue';
import { getVizFiles } from '../../../accessors';

const runDelay = 1000;

let firstRun = true;

const generateRunId = (() => {
  let runId = 0;
  return () => runId++;
})();

//let firstRun = true;
//const setSrcDocTimeout = () => {
//  if (firstRun) {
//    firstRun = false;
//    return 0;
//  }
//  return 1000;
//};

export const useRun = () => {
  //const { viz$, submitVizContentOp, vizContentOp$ } = useContext(VizContext);
  const { viz$ } = useContext(VizContext);
  const vizFiles = useValue(viz$, getVizFiles);
  const [runId, setRunId] = useState(generateRunId());

  //const resetRunTimer = () => {
  //  console.log('reset run timer');
  //};
  useEffect(() => {

    // Don't set timeout on first run.
    if(firstRun){
      firstRun = false;
      return;
    }

    const timeout = setTimeout(() => {
      setRunId(generateRunId());
    }, runDelay);

    return () => {
      clearTimeout(timeout);
    };
  }, [vizFiles]);

  //useEffect(() => {
  //  const subscription = vizContentOp$.subscribe(op => {
  //    console.log(op);
  //  });
  //  return () => subscription.unsubscribe();
  //}, [vizContentOp$]);

  return {
    // TODO reset run timer on keystroke in editor
    //resetRunTimer,
    runId
  };
};
