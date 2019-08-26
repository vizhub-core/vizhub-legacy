import { timestamp } from 'vizhub-entities';

export const updateLastUpdatedTimestamp = (viz$, submitVizInfoOp) => {
  const { info } = viz$.getValue();
  const before = info.lastUpdatedTimestamp;
  const after = timestamp();
  const op = [{ p: ['lastUpdatedTimestamp'], od: before, oi: after }];
  submitVizInfoOp(op);
};
