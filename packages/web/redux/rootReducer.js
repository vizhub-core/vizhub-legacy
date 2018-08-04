import { combineReducers } from 'redux';
import { uiRedux } from 'vizhub-ui';
import { csrfToken, visualization, showForkInvitation } from './reducers';
const { reducers: { ide } } = uiRedux;

export const rootReducer = combineReducers({
  ide,
  csrfToken,
  visualization,
  showForkInvitation
});
