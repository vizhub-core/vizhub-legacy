import { isMobile } from '../../../mobileMods';

export const reducer = (state, action) => {
  switch (action.type) {
    case 'setEdit':
      return Object.assign({}, state, {
        edit: action.value,
      });

    // Toggles the editor to show and hide.
    // If a file is active and the editor is opening,
    // open it to the files section.
    case 'toggleEditor':
      return Object.assign({}, state, {
        edit:
          state.edit || state.edit === null
            ? undefined
            : state.file
            ? 'files'
            : state.hidden.edit,
        hidden:
          state.edit || state.edit === null
            ? Object.assign({}, state.hidden, { edit: state.edit })
            : state.hidden,
        file: isMobile ? null : state.file,
      });

    case 'enterMini':
      return Object.assign({}, state, {
        mode: 'mini',
        file: state.file ? state.file : 'index.html',
        edit: state.file ? state.edit : 'files',
      });

    // Invoked when a file is selected (clicked on).
    // If the currently active file is clicked on, nothing happens here.
    case 'setActiveFile':
      return action.file === state.file
        ? state
        : Object.assign({}, state, { file: action.file, line: null });

    // Closes whatever file is open.
    // On mobile, if the mode is 'mini' or 'hidden' and we close the active file,
    // the mode needs to be set to 'viewer' (undefined) to avoid getting stuck.
    case 'closeActiveFile':
      return Object.assign({}, state, {
        file: undefined,
        mode:
          state.mode === 'mini' || state.mode === 'hide'
            ? undefined
            : state.mode,
        line: null,
      });

    // Invoked when a line is selected (clicked on).
    // If the currently active line is clicked on, nothing happens here.
    case 'setActiveLine':
      return action.line === state.line
        ? state
        : Object.assign({}, state, { line: action.line });

    case 'setMode':
      return Object.assign({}, state, {
        mode: action.mode === 'viewer' ? undefined : action.mode,
      });

    case 'exitRecoveryMode':
      window.location.hash = '';
      return state;

    default:
      throw new Error();
  }
};
