import { extractTitle, getFile, titleChangeOp } from '../../../accessors';

export const updateTitleIfNeeded = (viz$, submitVizInfoOp, realtimeModules) => {
  const { info, content } = viz$.getValue();
  const { files } = content;
  const oldTitle = info.title;
  const newTitle = extractTitle(getFile(files, 'index.html').text);

  if (oldTitle !== newTitle) {
    submitVizInfoOp(titleChangeOp(oldTitle, newTitle, realtimeModules));
  }
};
