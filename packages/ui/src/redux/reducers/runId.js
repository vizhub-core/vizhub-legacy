import { RUN_FILES } from '../actionTypes';

const generateRunId = () => Math.random().toString(36).substr(2);
export const runId = (state = generateRunId(), action) => {
  switch (action.type) {
    case RUN_FILES:
      return generateRunId();
    default:
      return state;
  }
};
