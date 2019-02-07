import { map, filter } from 'rxjs/operators';
import { RENAME_FILE } from '../actionTypes';
import { fileRenamed } from '../actionCreators';

export const promptForRenameEpic = action$ =>
  action$.ofType(RENAME_FILE).pipe(
    map(action => {
      const oldFileName = action.fileName;
      const newFileName = window.prompt('Please enter a new file name.', oldFileName);
      return newFileName && newFileName !== oldFileName
        ? fileRenamed(oldFileName, newFileName)
        : null;
    }),
    filter(Boolean)
  );
