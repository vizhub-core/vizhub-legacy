import { computeSrcDoc } from './computeSrcDoc';

export const GetSrcDoc = (() => {
  let srcDoc;
  let prevRunId;
  return (files, runId) => {
    if (runId !== prevRunId) {
      srcDoc = computeSrcDoc(files);
      prevRunId = runId;
    }
    return srcDoc;
  };
});
