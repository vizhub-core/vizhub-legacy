export const generateRunId = (() => {
  let runId = 0;
  return () => runId++ % 100;
})();
