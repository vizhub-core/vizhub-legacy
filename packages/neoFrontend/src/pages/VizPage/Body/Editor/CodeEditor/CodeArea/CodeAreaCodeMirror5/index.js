import React, { useState, useContext, useRef, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import ColorHash from 'color-hash';
import { getVizFile, getExtension, fileChangeOp } from 'vizhub-presenters';
import { lintJs } from '../../../../../../../featureFlags';
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
import { Wrapper } from './styles';
import { CodeMirrorGlobalStyle } from './CodeMirrorGlobalStyle';
import { PresenceWidget } from './PresenceWidget';
import { linkOverlay } from './overlays';

const colorHash = new ColorHash();

const modes = {
  '.html': 'htmlmixed',
  '.css': 'css',
  '.js': 'jsx',
  '.md': 'markdown',
};
const getMode = (extension) => modes[extension];

// Disable wrapping for JS code.
// Enable wrapping for everything else.
const getLineWrapping = (extension) => extension !== '.js';

const fileIndexOfPath = (path) => path[1];

export const CodeAreaCodeMirror5 = ({
  activeFile,
  activeLine,
  onGutterClick,
  onLinkClick,
}) => {
  const ref = useRef();
  const [codeMirror, setCodeMirror] = useState();

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

  // Alt+V to toggle Vim mode.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.altKey && e.code === 'KeyV') {
        toggleVimMode();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [toggleVimMode]);

  const manualRunRef = useRef(() => {});
  useEffect(() => {
    manualRunRef.current = () => {
      if (isAutoRunEnabled) {
        setIsAutoRunEnabled(false);
        cancelRunTimer();
        run();
      } else if (needsManualRun) {
        run();
      }
    };
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

  // Compute extension of active file (e.g. '.js', '.md').
  const extension = useMemo(() => getExtension(activeFile), [activeFile]);

  // Initialize codeMirror instance.
  useEffect(() => {
    if (!editorModules) return;

    if (codeMirror) return;

    const file = getVizFile(fileIndex)(viz$.getValue());

    // If the file does not exist at this point, it means that
    // we are accessing a URL that has a file "open" that doesn't exist,
    // either because it's been renamed or deleted.
    // In this case, we bail out to avoid a crash.
    if (!file) {
      return;
    }

    const { CodeMirror } = editorModules;
    const cm = new CodeMirror(ref.current, {
      mode: getMode(extension),
      value: file.text,
      lineNumbers: true,
      tabSize: 2,
      matchBrackets: true,
      closeOnBlur: false,
      extraKeys: {
        'Ctrl-Space': 'autocomplete',
        'Shift-Enter': () => {
          manualRunRef.current();
        },
      },
      gutters: ['CodeMirror-lint-markers'],
      lint: lintJs,
    });

    cm.addOverlay(linkOverlay);

    setCodeMirror(cm);
  }, [
    ref,
    editorModules,
    fileIndex,
    realtimeModules,
    viz$,
    codeMirror,
    extension,
  ]);

  useEffect(() => {
    if (!codeMirror) return;

    const subscriber = () => codeMirror.focus();

    subscribeOnPrettierSuccess(subscriber);

    return () => {
      unsubscribeFromPrettier(subscriber);
    };
  }, [codeMirror, subscribeOnPrettierSuccess, unsubscribeFromPrettier]);

  // Update language mode and wrapping when extension changes.
  useEffect(() => {
    if (!codeMirror) return;
    codeMirror.setOption('mode', getMode(extension));
    codeMirror.setOption('lineWrapping', getLineWrapping(extension));

    codeMirror.performLint();
  }, [codeMirror, extension]);

  // Don't allow editing of bundle.js.
  useEffect(() => {
    if (!codeMirror) return;
    codeMirror.setOption('readOnly', activeFile === 'bundle.js');
  }, [codeMirror, activeFile]);

  // Update keyMap.
  useEffect(() => {
    if (!codeMirror) return;
    codeMirror.setOption('keyMap', keyMap);
  }, [codeMirror, keyMap]);

  // Ensure newly opened file has focus.
  useEffect(() => {
    if (!codeMirror) return;
    codeMirror.focus();
  }, [codeMirror, activeFile]);

  // keep track of active doc line
  const activeDocLineNumberRef = useRef(null);

  // Respond to change of active line
  useEffect(() => {
    if (!codeMirror) return;

    const doc = codeMirror.getDoc();

    // need to reset previous line (if any)
    if (activeDocLineNumberRef.current !== null) {
      doc.removeLineClass(
        activeDocLineNumberRef.current,
        'wrap',
        'CodeMirror-activeline-background'
      );
    }

    if (!activeLine) return;

    // codemiror line count starts from 0, users count lines from 1
    const updatedActiveDocLineNumber = activeLine - 1;

    doc.addLineClass(
      updatedActiveDocLineNumber,
      'wrap',
      'CodeMirror-activeline-background'
    );

    const top = codeMirror.heightAtLine(updatedActiveDocLineNumber, 'local');

    codeMirror.scrollTo(null, top);

    activeDocLineNumberRef.current = updatedActiveDocLineNumber;
  }, [codeMirror, activeLine]);

  // Respond to gutter click
  useEffect(() => {
    if (!codeMirror) return;

    const handler = (_, docLineNumber) => {
      onGutterClick(docLineNumber + 1);
    };

    codeMirror.on('gutterClick', handler);
    return () => {
      codeMirror.off('gutterClick', handler);
    };
  }, [codeMirror, onGutterClick]);

  // Respond to link click
  useEffect(() => {
    if (!codeMirror) return;

    const handler = (_, event) => {
      if (event.ctrlKey && event.target.classList.contains('cm-link')) {
        event.preventDefault();
        event.stopPropagation();
        onLinkClick(event.target.textContent);
      }
    };

    codeMirror.on('mousedown', handler);
    return () => {
      codeMirror.off('mousedown', handler);
    };
  }, [codeMirror, onLinkClick]);

  // Respond to changes in text.
  // Submit ops for local user-generated changes.
  // Ignore other types of changes (remote op, initialization using setValue).
  useEffect(() => {
    if (!codeMirror) return;

    const onTextChange = (instance, changes) => {
      // Assumption: if the first change object is user generated,
      // then all other change objects in the same operation are as well.
      if (changes[0].origin !== 'op') {
        const newText = codeMirror.getValue();
        const oldText = getVizFile(fileIndex)(viz$.getValue()).text;
        const op = fileChangeOp(fileIndex, oldText, newText, realtimeModules);

        submittingOp.current = true;
        submitVizContentOp(op);
        submittingOp.current = false;
      }
    };

    codeMirror.on('changes', onTextChange);
    return () => {
      codeMirror.off('changes', onTextChange);
    };
  }, [codeMirror, submitVizContentOp, path, fileIndex, realtimeModules, viz$]);

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
  }, [viz$, ref, vizContentOp$, realtimeModules, path, fileIndex, codeMirror]);

  // Reset run timer on cursor movement.
  //
  // Motivation: If the user is moving about in the code editor,
  // chances are they are going to make some edits,
  // and they don't want the run to happen soon,
  // so better reset the run timer on each cursor motion.
  useEffect(() => {
    if (!codeMirror) return;
    codeMirror.on('cursorActivity', resetRunTimer);
    return () => {
      codeMirror.off('cursorActivity', resetRunTimer);
    };
  }, [codeMirror, resetRunTimer]);

  // Submit presence
  useEffect(() => {
    if (!codeMirror || !me) return;
    const handleCursorActivity = () => {
      const from = codeMirror.getCursor(true);
      const to = codeMirror.getCursor(false);

      const doc = codeMirror.getDoc();
      const fromIndex = doc.indexFromPos(from);
      const toIndex = doc.indexFromPos(to);

      const presenceObject = {
        path,
        index: fromIndex,
        length: toIndex - fromIndex,
        userId: me.id,
      };

      submitVizContentPresence(presenceObject);
    };
    codeMirror.on('cursorActivity', handleCursorActivity);

    // Remove presence on blur.
    const handleBlur = () => {
      submitVizContentPresence(null);
    };
    codeMirror.on('blur', handleBlur);

    return () => {
      codeMirror.off('cursorActivity', handleCursorActivity);
      codeMirror.off('blur', handleBlur);
    };
  }, [codeMirror, submitVizContentPresence, path, me]);

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

  return (
    <>
      <CodeMirrorGlobalStyle />
      <Wrapper ref={ref} />
      {!editorModules ? <LoadingScreen color={light} isChild={true} /> : null}
    </>
  );
};
