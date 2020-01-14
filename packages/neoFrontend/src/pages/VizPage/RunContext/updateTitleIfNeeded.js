import { extractTitle, getFile, titleChangeOp } from 'vizhub-presenters';

export const updateTitleIfNeeded = (viz$, submitVizInfoOp, realtimeModules) => {
  const { info, content } = viz$.getValue();
  const { files } = content;
  const oldTitle = info.title;
  const { text } = getFile(files, 'index.html') || {};
  const newTitle = extractTitle(text);

  if (oldTitle !== newTitle) {
    submitVizInfoOp(titleChangeOp(oldTitle, newTitle, realtimeModules));
  }
};
