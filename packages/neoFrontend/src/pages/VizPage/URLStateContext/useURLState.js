import { useAccessors } from './useAccessors';

// Higher order component exposing URL state accessors.
export const useURLState = props => {
  // Raw accessor functions for URL parameter state.
  const {
    edit,
    setEdit,
    file: activeFile,
    setFile,
    mode: modeRaw,
    setMode: setModeRaw
  } = useAccessors(props);

  // Boolean value, whether or not the editor should be shown.
  const showEditor = edit !== undefined;
  const setShowEditor = value => setEdit(value ? null : undefined);

  // Toggles the editor to show and hide.
  const toggleEditor = () => {
    if (showEditor) {
      setShowEditor(false);
    } else if (activeFile) {
      // If a file is active, open the files section.
      setEdit('files');
    } else {
      setShowEditor(true);
    }
  };

  // The active editor section id string if a section is active.
  // null if no editor section is active.
  const activeSection = edit;

  // Accepts a section id string.
  const setActiveSection = setEdit;

  // Invoked when a file is selected (clicked on).
  const setActiveFile = selectedFile => {
    const newFile = selectedFile === activeFile ? undefined : selectedFile;
    setFile(newFile);
  };

  // Closes whatever file is open.
  const closeActiveFile = () => {
    setFile(undefined);
  };

  // The ID of the visualization we are viewing.
  const vizId = props.match.params.vizId;

  // These accessors convert between the raw value passed into query-string
  // and the values expected in the code. The correspondence is as follows:
  //  * format: <raw value> = <expected value>
  //  * "full" = "full"
  //  * "mini" = "mini"
  //  * "hide" = "hide"
  //  * undefined = "viewer" <--- This is the only difference.
  //
  // The difference exists so that we can omit the "mode" parameter from the
  // URL entirely when the user is viewing the "normal", default page state.
  const mode = modeRaw || 'viewer';

  const setMode = newMode => {
    if (newMode !== mode) {
      setModeRaw(newMode === 'viewer' ? undefined : newMode);
    }
  };

  const onHideViz = () => setMode('hide');
  const onShowViz = () => setMode('viewer');

  const isFullScreen = mode === 'full';
  const enterFullScreen = () => setMode('full');
  const exitFullScreen = onShowViz;

  const isMini = mode === 'mini';
  const enterMini = () => {
    setMode('mini');
    if (!activeFile) {
      setFile('index.html');
      setEdit('files');
    }
  };
  const exitMini = onShowViz;

  const showViewer = mode !== 'hide' && mode !== 'mini';

  const showResizer = activeFile !== undefined;

  // Derived accessors for URL state, exposed to components.
  return {
    activeFile,
    setActiveFile,
    closeActiveFile,
    showEditor,
    toggleEditor,
    activeSection,
    setActiveSection,
    vizId,
    mode,
    setMode,
    onHideViz,
    onShowViz,
    isFullScreen,
    enterFullScreen,
    exitFullScreen,
    showViewer,
    isMini,
    enterMini,
    exitMini,
    showResizer
  };
};
