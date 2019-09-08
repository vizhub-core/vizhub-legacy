import React, { useState, useContext, useRef, useEffect, useMemo } from 'react';
import {
  getVizFile,
  getExtension,
  fileChangeOp
} from '../../../../../../../accessors';
import { LoadingScreen } from '../../../../../../../LoadingScreen';
import { VizContext } from '../../../../../VizContext';
import { RunContext } from '../../../../../RunContext';
import { RealtimeModulesContext } from '../../../../../RealtimeModulesContext';
import { EditorModulesContext } from '../../../../../EditorModulesContext';
import { light } from '../../../themes/vizHub';
import { useFileIndex } from '../../useFileIndex';
import { usePath } from '../../usePath';
import { Wrapper } from './styles';
import { CodeMirrorGlobalStyle } from './CodeMirrorGlobalStyle';
import { useStateLocalStorage } from './useStateLocalStorage';

const modes = {
  '.html': 'htmlmixed',
  '.css': 'css',
  '.js': 'jsx',
  '.md': 'markdown'
};
const getMode = extension => modes[extension];

// Wrap lines on .md files.
const getLineWrapping = extension => extension === '.md';

const defaultKeyMap = 'sublime';

export const CodeAreaCodeMirror5 = ({ activeFile }) => {
  const ref = useRef();
  const [codeMirror, setCodeMirror] = useState();
  const [keyMap, setKeyMap] = useStateLocalStorage('keyMap', defaultKeyMap);

  // Easter egg
  window.vizhub.enableVimMode = () => setKeyMap('vim');
  window.vizhub.disableVimMode = () => setKeyMap(defaultKeyMap);

  const { viz$, submitVizContentOp, vizContentOp$ } = useContext(VizContext);
  const { resetRunTimer } = useContext(RunContext);
  const fileIndex = useFileIndex(viz$, activeFile);
  const path = usePath(fileIndex);
  const realtimeModules = useContext(RealtimeModulesContext);
  const { editorModules, loadEditorModules } = useContext(EditorModulesContext);

  // Request to load editor modules.
  // This line is only strictly required in the case that the user opens a link
  // where the editor sidebar is closed, but the code editor is open.
  // This is a no-op if the modules are already loaded.
  loadEditorModules();

  // Initialize codeMirror instance.
  useEffect(() => {
    if (!editorModules) return;

    const file = getVizFile(fileIndex)(viz$.getValue());

    // If the file does not exist at this point, it means that
    // we are accessing a URL that has a file "open" that doesn't exist,
    // either because it's been renamed or deleted.
    // In this case, we bail out to avoid a crash.
    if (!file) {
      return;
    }

    const { CodeMirror } = editorModules;

    setCodeMirror(
      new CodeMirror(ref.current, {
        value: file.text,
        lineNumbers: true,
        tabSize: 2,
        matchBrackets: true
        // Make Tab key insert spaces.
        // From https://codemirror.net/doc/manual.html#keymaps
        //extraKeys: {
        //  Tab: cm => {
        //    const spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
        //    cm.replaceSelection(spaces);
        //  }
        //}
      })
    );
  }, [ref, editorModules, fileIndex, realtimeModules, viz$]);

  // Compute extension of active file (e.g. '.js', '.md').
  const extension = useMemo(() => getExtension(activeFile), [activeFile]);

  // Update language mode and wrapping when extension changes.
  useEffect(() => {
    if (!codeMirror) return;
    codeMirror.setOption('mode', getMode(extension));
    codeMirror.setOption('lineWrapping', getLineWrapping(extension));
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

  // Respond to changes in text.
  // Submit ops for local user-generated changes.
  // Ignore other types of changes (remote op, initialization using setValue).
  useEffect(() => {
    if (!codeMirror) return;

    const onTextChange = (instance, changes) => {
      // Assumption: if the first change object is user generated,
      // then all other change objects in the same operation are as well.
      if (changes[0].origin !== 'remoteOp') {
        const newText = codeMirror.getValue();
        const oldText = getVizFile(fileIndex)(viz$.getValue()).text;
        const op = fileChangeOp(fileIndex, oldText, newText, realtimeModules);
        submitVizContentOp(op);
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

    const subscription = vizContentOp$.subscribe(
      ({ previous, next, op, originatedLocally }) => {
        if (!originatedLocally) {
          const doc = codeMirror.getDoc();
          op.forEach(c => {
            if (json0.canOpAffectPath(c, path)) {
              const i = c.p[c.p.length - 1];
              if (c.si) {
                const pos = doc.posFromIndex(i);
                codeMirror.replaceRange(c.si, pos, pos, 'remoteOp');
              } else if (c.sd) {
                codeMirror.replaceRange(
                  '',
                  doc.posFromIndex(i),
                  doc.posFromIndex(i + c.sd.length),
                  'remoteOp'
                );
              }
            }
          });
        }
      }
    );
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

  return (
    <>
      <CodeMirrorGlobalStyle />
      <Wrapper ref={ref} />
      {!editorModules ? <LoadingScreen color={light} isChild={true} /> : null}
    </>
  );
};
