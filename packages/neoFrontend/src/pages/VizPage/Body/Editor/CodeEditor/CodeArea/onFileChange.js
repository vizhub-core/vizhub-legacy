import { generateFileChangeOp } from './generateFileChangeOp';

export const onFileChange = (
  name,
  vizContentDoc,
  realtimeModules
) => newText => {
  const files = vizContentDoc.data.files;
  const op = generateFileChangeOp(files, name, newText, realtimeModules);
  vizContentDoc.submitOp(op);
};
