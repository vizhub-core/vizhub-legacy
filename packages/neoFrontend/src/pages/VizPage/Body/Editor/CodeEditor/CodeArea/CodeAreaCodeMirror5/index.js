import React, {
  useContext,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import ColorHash from 'color-hash';
import { getVizFile, fileChangeOp } from 'vizhub-presenters';
import { LoadingScreen } from '../../../../../../../LoadingScreen';
import { VizContext } from '../../../../../VizContext';
import { VimModeContext } from '../../../../../VimModeContext';
import { RunContext } from '../../../../../RunContext';
import { PrettierContext } from '../../../../../PrettierContext';
import { AuthContext } from '../../../../../../../authentication';
import { RealtimeModulesContext } from '../../../../../../../RealtimeModulesContext';
import { EditorModulesContext } from '../../../../../EditorModulesContext';
import { light } from '../../../themes/vizHub';
import { useFileIndex } from '../../useFileIndex';
import { usePath } from '../../usePath';
import { PresenceWidget } from './PresenceWidget';
import { CodeMirrorReactBinding } from './CodeMirrorReactBinding';

const colorHash = new ColorHash();

const fileIndexOfPath = (path) => path[1];

const historyByFile = {}
const cursorByFile = {}

export const CodeAreaCodeMirror5 = ({
  activeFile,
  selectedLines,
  onGutterClick,
  onLinkClick,
}) => {
  const [codeMirror, setCodeMirror] = useState(null);

  const {
    viz$,
    submitVizContentOp,
    vizContentOp$,
    submitVizContentPresence,
    vizContentPresence$,
  } = useContext(VizContext);
  const {
    resetRunTimer,
    needsManualRun,
    cancelRunTimer,
    isAutoRunEnabled,
    setIsAutoRunEnabled,
    run,
  } = useContext(RunContext);
  const { keyMap, toggleVimMode } = useContext(VimModeContext);
  const fileIndex = useFileIndex(viz$, activeFile);
  const path = usePath(fileIndex);
  const realtimeModules = useContext(RealtimeModulesContext);
  const { editorModules, loadEditorModules } = useContext(EditorModulesContext);
  const { me } = useContext(AuthContext);
  const {
    subscribe: subscribeOnPrettierSuccess,
    unsubscribe: unsubscribeFromPrettier,
  } = useContext(PrettierContext);

  // A flag indicating we are in the process of submitting an op.
  const submittingOp = useRef(false);

  const manualRun = useCallback(() => {
    // console.log('SHIFT ENTER', isAutoRunEnabled, needsManualRun);
    if (isAutoRunEnabled) {
      setIsAutoRunEnabled(false);
      cancelRunTimer();
      run();
    } else if (needsManualRun) {
      run();
    }
  }, [
    isAutoRunEnabled,
    setIsAutoRunEnabled,
    run,
    cancelRunTimer,
    needsManualRun,
  ]);

  // Request to load editor modules.
  // This line is only strictly required in the case that the user opens a link
  // where the editor sidebar is closed, but the code editor is open.
  // This is a no-op if the modules are already loaded.
  loadEditorModules();

  const fileText = useMemo(() => {
    const file = getVizFile(fileIndex)(viz$.getValue());

    // If the file does not exist at this point, it means that
    // we are accessing a URL that has a file "open" that doesn't exist,
    // either because it's been renamed or deleted.
    // In this case, we bail out to avoid a crash.
    if (!file) {
      return null;
    }

    return file.text;
  }, [viz$, fileIndex]);

  useEffect(() => {
    if (!codeMirror) return;

    const subscriber = () => codeMirror.focus();

    subscribeOnPrettierSuccess(subscriber);

    return () => {
      unsubscribeFromPrettier(subscriber);
    };
  }, [codeMirror, subscribeOnPrettierSuccess, unsubscribeFromPrettier]);

  // Respond to changes in text.
  const handleFileTextChange = useCallback(
    (newText) => {
      const oldText = getVizFile(fileIndex)(viz$.getValue()).text;
      const op = fileChangeOp(fileIndex, oldText, newText, realtimeModules);

      submittingOp.current = true;
      submitVizContentOp(op);
      submittingOp.current = false;
    },
    [submitVizContentOp, fileIndex, realtimeModules, viz$]
  );

  // Initialize text and subscribe to changes.
  useEffect(() => {
    if (!realtimeModules || !codeMirror) {
      return;
    }

    const { json0 } = realtimeModules;

    const subscription = vizContentOp$.subscribe(({ op }) => {
      if (!submittingOp.current) {
        const doc = codeMirror.getDoc();
        op.forEach((c) => {
          if (json0.canOpAffectPath(c, path)) {
            const i = c.p[c.p.length - 1];
            if (c.si) {
              const pos = doc.posFromIndex(i);
              codeMirror.replaceRange(c.si, pos, pos, 'op');
            } else if (c.sd) {
              codeMirror.replaceRange(
                '',
                doc.posFromIndex(i),
                doc.posFromIndex(i + c.sd.length),
                'op'
              );
            }
          }
        });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [viz$, vizContentOp$, realtimeModules, path, fileIndex, codeMirror]);

  // Submit presence
  const handleCursorPositionChange = useCallback(
    (presenceObject) => {
      if (!me) return;

      if (presenceObject) {
        submitVizContentPresence({
          path,
          userId: me.id,
          ...presenceObject,
        });
      } else {
        submitVizContentPresence(null);
      }
    },
    [submitVizContentPresence, path, me]
  );

  // Render remote presence(s).
  useEffect(() => {
    if (!codeMirror) return;
    const doc = codeMirror.getDoc();

    const widgets = {};
    const markers = {};
    const selectionMarkers = {};
    const subscription = vizContentPresence$.subscribe(
      ({ presenceId, presenceObject }) => {
        // Clear old cursor marker.
        const oldMarker = markers[presenceId];
        if (oldMarker) {
          oldMarker.clear();
        }

        // Clear old selection marker.
        const oldSelectionMarker = selectionMarkers[presenceId];
        if (oldSelectionMarker) {
          oldSelectionMarker.clear();
        }

        // Handle the case of disconnecting clients.
        if (!presenceObject) {
          return;
        }

        // Ignore presence changes in files that are not open.
        if (fileIndex !== fileIndexOfPath(presenceObject.path)) return;

        const { index, length, userId } = presenceObject;

        const cursorPos = doc.posFromIndex(index);
        const cursorPosEnd = doc.posFromIndex(index + length);

        const cursorCoords = codeMirror.cursorCoords(cursorPos);
        const charWidth = codeMirror.defaultCharWidth();

        const userColor = colorHash.hex(userId);

        let widget = widgets[presenceId];
        if (!widget) {
          widget = document.createElement('span');
          widget.style.position = 'relative';
          widgets[presenceId] = widget;
        }
        ReactDOM.render(
          <PresenceWidget
            charWidth={charWidth}
            userColor={userColor}
            userId={userId}
            height={cursorCoords.bottom - cursorCoords.top}
            isFirstLine={cursorPos.line === 0}
          />,
          widget
        );

        // Create new cursor marker.
        const newMarker = codeMirror.setBookmark(cursorPos, { widget });
        markers[presenceId] = newMarker;

        // Create new selection marker.
        const newSelectionMarker = codeMirror.markText(
          cursorPos,
          cursorPosEnd,
          { css: `background-color: ${userColor}40` }
        );

        selectionMarkers[presenceId] = newSelectionMarker;
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [vizContentPresence$, codeMirror, fileIndex]);

  const [highlightScrollStrategy, setHighlightScrollStrategy] = useState('top');

  const handleGutterClick = useCallback(
    (...args) => {
      // Order metters, if setHighlightScrollStrategy called after setHighlightScrollStrategy
      // in case when strategy changes from default one to none
      // previous defult would be applied for current click.
      // This order changes strategy for current click as well
      setHighlightScrollStrategy('none');
      onGutterClick(...args);
    },
    [onGutterClick]
  );

  const saveEditorState = useCallback(({ fileName, cursor, history }) => {
    historyByFile[fileName] = history;
    cursorByFile[fileName] = cursor;
  }, []);

  return (
    <>
      {fileText !== null && (
        <CodeMirrorReactBinding
          ref={setCodeMirror}
          fileText={fileText}
          fileName={activeFile}
          selectedLines={selectedLines}
          readonly={activeFile === 'bundle.js'}
          keyMap={keyMap}
          editorModules={editorModules}
          highlightScrollStrategy={highlightScrollStrategy}
          history={historyByFile[activeFile]}
          cursor={cursorByFile[activeFile]}
          onGutterClick={handleGutterClick}
          onLinkClick={onLinkClick}
          onManualRun={manualRun}
          onFileTextChange={handleFileTextChange}
          onCursorActivity={resetRunTimer}
          onCursorPositionChange={handleCursorPositionChange}
          onToggleVimMode={toggleVimMode}
          onDestroy={saveEditorState}
        />
      )}
      {!editorModules ? <LoadingScreen color={light} isChild={true} /> : null}
    </>
  );
};
