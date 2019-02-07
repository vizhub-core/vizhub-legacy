import {
  SPLIT_PANE_DRAG_STARTED,
  SPLIT_PANE_DRAG_FINISHED
} from '../actionTypes';

export const splitPaneDragging = (state = false, action) => {
  switch (action.type) {
    case SPLIT_PANE_DRAG_STARTED:
      return true;
    case SPLIT_PANE_DRAG_FINISHED:
      return false;
    default:
      return state;
  }
};
