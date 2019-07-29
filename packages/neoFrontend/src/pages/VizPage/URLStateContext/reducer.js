export const reducer = (state, action) => {
  switch (action.type) {
    case 'setEdit':
      return Object.assign({}, state, {
        edit: action.value
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
        hidden: Object.assign({}, state.hidden, {
          edit: state.edit
        })
      });

    case 'enterMini':
      return Object.assign({}, state, {
        mode: 'mini',
        file: state.file ? state.file : 'index.html',
        edit: state.file ? state.edit : 'files'
      });

    // Invoked when a file is selected (clicked on).
    // If the currently active file is clicked on, it's closed.
    case 'setActiveFile':
      return Object.assign({}, state, {
        file: action.file === state.file ? undefined : action.file
      });

    // Closes whatever file is open.
    // On mobile, if the mode is 'mini' and we close the active file,
    // the mode needs to be set to 'viewer' to avoid getting stuck in 'mini'.
    case 'closeActiveFile':
      return Object.assign({}, state, {
        file: undefined,
        mode: state.mode === 'mini' ? 'viewer' : state.mode
      });

    case 'setMode':
      return Object.assign({}, state, {
        mode: action.mode === 'viewer' ? undefined : action.mode
      });

    default:
      throw new Error();
  }
};
