import { delay, mapTo } from 'rxjs/operators';
import { SAVE } from '../redux/actionTypes';
import { saveSuccess } from '../redux/actionCreators';

// Simulates saving the data to the server, with a delay of 1 second,
// for testing the "Saving..." -> "Saved" part of the UI.
export const saveSimulationEpic = action$ =>
  action$.ofType(SAVE).pipe(
    delay(1000),
    mapTo(saveSuccess())
  );
