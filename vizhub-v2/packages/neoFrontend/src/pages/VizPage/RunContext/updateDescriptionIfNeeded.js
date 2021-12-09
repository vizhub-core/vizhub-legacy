import { getFile, descriptionChangeOp } from 'vizhub-presenters';

export const updateDescriptionIfNeeded = (
  viz$,
  submitVizInfoOp,
  realtimeModules
) => {
  const { info, content } = viz$.getValue();
  const { files } = content;
  const oldDescription = info.description;
  const readme = getFile(files, 'README.md');
  const newDescription = readme ? readme.text : '';

  if (oldDescription !== newDescription) {
    submitVizInfoOp(
      descriptionChangeOp(oldDescription, newDescription, realtimeModules)
    );
  }
};
