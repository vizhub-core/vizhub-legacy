import React, { useState, useContext, useRef, useEffect, useMemo } from 'react';
import ColorHash from 'color-hash';
import { getVizFile, getExtension, fileChangeOp } from 'vizhub-presenters';
import { LoadingScreen } from '../../../../../../../LoadingScreen';
import { VizContext } from '../../../../../VizContext';
import { RunContext } from '../../../../../RunContext';
import { AuthContext } from '../../../../../../../authentication';
import { RealtimeModulesContext } from '../../../../../RealtimeModulesContext';
import { EditorModulesContext } from '../../../../../EditorModulesContext';
import { light } from '../../../themes/vizHub';
import { useFileIndex } from '../../useFileIndex';
import { usePath } from '../../usePath';
import { Wrapper } from './styles';
import { CodeMirrorGlobalStyle } from './CodeMirrorGlobalStyle';
import { useStateLocalStorage } from './useStateLocalStorage';

const colorHash = new ColorHash();

const modes = {
  '.html': 'htmlmixed',
  '.css': 'css',
  '.js': 'jsx',
  '.md': 'markdown',
};
const getMode = (extension) => modes[extension];

const defaultKeyMap = 'sublime';

export const CodeAreaCodeMirror5 = ({ activeFile }) => {
  const ref = useRef();
  const [codeMirror, setCodeMirror] = useState();
  const [keyMap, setKeyMap] = useStateLocalStorage('keyMap', defaultKeyMap);

  // Alt+V to toggle Vim mode.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.altKey && e.code === 'KeyV') {
        setKeyMap(keyMap === 'vim' ? defaultKeyMap : 'vim');
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [keyMap, setKeyMap]);

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
  const fileIndex = useFileIndex(viz$, activeFile);
  const path = usePath(fileIndex);
  const realtimeModules = useContext(RealtimeModulesContext);
  const { editorModules, loadEditorModules } = useContext(EditorModulesContext);
  const { me } = useContext(AuthContext);

  // A flag indicating we are in the process of submitting an op.
  const submittingOp = useRef(false);

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

    CodeMirror.commands.autocomplete = (cm) => {
      cm.showHint({ hint: CodeMirror.hint.anyword });
    };

    setCodeMirror(
      new CodeMirror(ref.current, {
        value: file.text,
        lineNumbers: true,
        lineWrapping: true,
        tabSize: 2,
        matchBrackets: true,
        closeOnBlur: false,
        extraKeys: {
          'Ctrl-Space': 'autocomplete',
          'Shift-Enter': () => {
            manualRunRef.current();
          },
        },
      })
    );
  }, [ref, editorModules, fileIndex, realtimeModules, viz$, codeMirror]);

  // Compute extension of active file (e.g. '.js', '.md').
  const extension = useMemo(() => getExtension(activeFile), [activeFile]);

  // Update language mode and wrapping when extension changes.
  useEffect(() => {
    if (!codeMirror) return;
    codeMirror.setOption('mode', getMode(extension));
  }, [codeMirror, extension]);

  // Don't allow editing of bundle.js.
  useEffect(() => {
    if (!codeMirror) return;
    codeMirror.setOption('readOnly', activeFile === 'bundle.js');
  }, [codeMirror, activeFile]);

  // Update keyMap.
  useEffect(() => {
    if (!codeMirror) return;
    // Only support vim mode, or default keymap.
    codeMirror.setOption('keyMap', keyMap === 'vim' ? 'vim' : defaultKeyMap);
  }, [codeMirror, keyMap]);

  // Ensure newly opened file has focus.
  useEffect(() => {
    if (!codeMirror) return;
    codeMirror.focus();
  }, [codeMirror, activeFile]);

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
    return () => {
      codeMirror.off('cursorActivity', handleCursorActivity);
    };
  }, [codeMirror, submitVizContentPresence, path, me]);

  // Render remote presence(s).
  useEffect(() => {
    if (!codeMirror) return;
    const doc = codeMirror.getDoc();

    const widgets = {};
    const markers = {};
    const subscription = vizContentPresence$.subscribe(
      ({ presenceId, presenceObject }) => {
        console.log('got presenceObject');
        console.log(presenceId);
        console.log(presenceObject);
        const cursorPos = doc.posFromIndex(presenceObject.index);

        const cursorCoords = codeMirror.cursorCoords(cursorPos);

        let widget = widgets[presenceId];
        if (!widget) {
          widget = document.createElement('span');
          // From https://dev.to/yoheiseki/how-to-display-the-position-of-the-cursor-caret-of-another-client-with-codemirror-6p8
          widget.style.borderLeftStyle = 'solid';
          widget.style.borderLeftWidth = '2px';
          widget.style.marginRight = '-2px';
          widget.style.padding = 0;
          widget.style.zIndex = 0;
          widget.style.borderLeftColor = colorHash.hex(presenceObject.userId);
          widget.style.height = `${cursorCoords.bottom - cursorCoords.top}px`;

          widgets[presenceId] = widget;
        }

        const oldMarker = markers[presenceId];
        if (oldMarker) {
          oldMarker.clear();
        }
        const newMarker = codeMirror.setBookmark(cursorPos, { widget });
        markers[presenceId] = newMarker;
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [vizContentPresence$, codeMirror]);

  return (
    <>
      <CodeMirrorGlobalStyle />
      <Wrapper ref={ref} />
      {!editorModules ? <LoadingScreen color={light} isChild={true} /> : null}
    </>
  );
};
