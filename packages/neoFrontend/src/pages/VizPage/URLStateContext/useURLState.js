import { useCallback } from 'react';
import { useURLStateReducer } from './useURLStateReducer';
import { reducer } from './reducer';

// This accessor converts between the raw value used with query-string
// and the values expected in the code. The correspondence is as follows:
//  * format: <raw value> = <expected value>
//  * "full" = "full"
//  * "mini" = "mini"
//  * "hide" = "hide"
//  * undefined = "viewer" <--- This is the only difference.
//
// The difference exists so that we can omit the "mode" parameter from the
// URL entirely when the user is viewing the "viewer", the default page state.
const getMode = (state) => state.mode || 'viewer';

// Higher order component exposing URL state accessors.
export const useURLState = (props) => {
  const [state, dispatch] = useURLStateReducer(reducer, props);
  const { edit, file: activeFile } = state;

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

  const onHideViz = () => setMode('hide');
  const onShowViz = () => setMode('viewer');

  const isFullScreen = mode === 'full';
  const enterFullScreen = () => setMode('full');
  const exitFullScreen = onShowViz;

  const exitMini = onShowViz;

  const showViewer = mode !== 'hide' && mode !== 'mini';

  const showResizer = activeFile !== undefined;

  const isRecoveryMode = window.location.hash === '#recover';
  const exitRecoveryMode = useCallback(() => {
    dispatch({ type: 'exitRecoveryMode' });
  }, [dispatch]);

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
    enterMini,
    exitMini,
    showResizer,
    isRecoveryMode,
    exitRecoveryMode,
  };
};
