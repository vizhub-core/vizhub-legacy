import { useCallback } from 'react';
import { useURLStateReducer } from './useURLStateReducer';
import { reducer } from './reducer';
import { modes } from './modes';

// This accessor converts between the raw value used with query-string
// and the values expected in the code. The correspondence is as follows:
//  * format: <raw value> = <expected value>
//  * "full" = "full"
//  * "mini" = "mini"
//  * "hide" = "hide"
//  * "embed" = "embed"
//  * undefined = "viewer" <--- This is the only difference.
//
// The difference exists so that we can omit the "mode" parameter from the
// URL entirely when the user is viewing the "viewer", the default page state.
const getMode = (state) => state.mode || modes.viewer;

// Higher order component exposing URL state accessors.
export const useURLState = (props) => {
  const [state, dispatch] = useURLStateReducer(reducer, props);
  const { edit, file: activeFile, range, selectedLines } = state;

  const setEdit = useCallback(
    (value) => {
      dispatch({ type: 'setEdit', value });
    },
    [dispatch]
  );

  const enterMini = useCallback(() => {
    dispatch({ type: 'enterMini' });
  }, [dispatch]);

  const toggleEditor = useCallback(() => {
    dispatch({ type: 'toggleEditor' });
  }, [dispatch]);

  const setActiveFile = useCallback(
    (file) => {
      dispatch({ type: 'setActiveFile', file });
    },
    [dispatch]
  );

  const closeActiveFile = useCallback(() => {
    dispatch({ type: 'closeActiveFile' });
  }, [dispatch]);

  const toggleLine = useCallback(
    (line) => {
      dispatch({
        type: 'setSelectedLines',
        selectedLines: selectedLines === line ? null : line,
      });
    },
    [selectedLines, dispatch]
  );

  const setMode = useCallback(
    (mode) => {
      dispatch({ type: 'setMode', mode });
    },
    [dispatch]
  );

  // Boolean value, whether or not the editor should be shown.
  const showEditor = edit !== undefined;

  // The active editor section id string if a section is active.
  // null if no editor section is active.
  const activeSection = edit;

  // Accepts a section id string.
  const setActiveSection = setEdit;

  // The ID of the visualization we are viewing.
  const vizId = props.match.params.vizId;
  const mode = getMode(state);

  const onHideViz = () => setMode(modes.hide);
  const onShowViz = () => setMode(modes.viewer);

  const enterFullScreen = () => setMode(modes.full);
  const exitFullScreen = onShowViz;

  const exitMini = onShowViz;

  const showViewer = mode !== modes.hide && mode !== modes.mini;

  const showResizer = activeFile !== undefined;

  const isRecoveryMode = window.location.hash === '#recover';
  const exitRecoveryMode = useCallback(() => {
    dispatch({ type: 'exitRecoveryMode' });
  }, [dispatch]);

  const openLink = useCallback((link) => {
    window.open(link, '_blank');
  }, []);

  // Derived accessors for URL state, exposed to components.
  return {
    activeFile,
    setActiveFile,
    closeActiveFile,
    selectedLines,
    toggleLine,
    showEditor,
    toggleEditor,
    activeSection,
    setActiveSection,
    vizId,
    mode,
    range,
    setMode,
    onHideViz,
    onShowViz,
    enterFullScreen,
    exitFullScreen,
    showViewer,
    enterMini,
    exitMini,
    showResizer,
    isRecoveryMode,
    exitRecoveryMode,
    openLink,
  };
};
