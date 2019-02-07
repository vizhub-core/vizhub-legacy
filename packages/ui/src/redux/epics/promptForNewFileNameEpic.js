import { map } from 'rxjs/operators';
import { CREATE_NEW_FILE } from '../actionTypes';
import { newFileCreated } from '../actionCreators';

export const promptForNewFileNameEpic = action$ =>
  action$.ofType(CREATE_NEW_FILE).pipe(
    map(action => {
      const fileName = window.prompt('Please enter a file name', 'myNewFile.js');
      return newFileCreated(fileName);
    })
  );
