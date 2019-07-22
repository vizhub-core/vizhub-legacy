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
    setShowEditor(!showEditor);
    window.dispatchEvent(new Event('editorResized'));
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

    if (activeFile === undefined || newFile === undefined) {
      window.dispatchEvent(new Event('editorResized'));
    }
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
      window.dispatchEvent(
        new CustomEvent('vizModeChange', { detail: newMode })
      );
      setModeRaw(newMode === 'viewer' ? undefined : newMode);
    }
  };

  const hideViz = () => setMode('hide');
  const isFullScreen = mode === 'full';
  const setIsFullScreen = isFullScreen =>
    setMode(isFullScreen ? 'full' : 'viewer');

  // Derived accessors for URL state, exposed to components.
  return {
    activeFile,
    setActiveFile,
    showEditor,
    toggleEditor,
    activeSection,
    setActiveSection,
    vizId,
    mode,
    setMode,
    hideViz,
    isFullScreen,
    setIsFullScreen
  };
};
