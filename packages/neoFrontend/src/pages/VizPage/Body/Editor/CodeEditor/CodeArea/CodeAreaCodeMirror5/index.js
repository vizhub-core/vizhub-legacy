import React, { useState, useContext, useRef, useEffect } from 'react';
import { getVizFile, getExtension } from '../../../../../../../accessors';
import { LoadingScreen } from '../../../../../../../LoadingScreen';
import { VizContext } from '../../../../../VizContext';
import { RunContext } from '../../../../../RunContext';
import { RealtimeModulesContext } from '../../../../../RealtimeModulesContext';
import { EditorModulesContext } from '../../../../../EditorModulesContext';
import { light } from '../../../themes/vizHub';
import { useFileIndex } from '../../useFileIndex';
import { usePath } from '../../usePath';
import { Wrapper } from './styles';
import { changeObjToOp } from './changeObjToOp';
import { CodeMirrorGlobalStyle } from './CodeMirrorGlobalStyle';
import { useStateLocalStorage } from './useStateLocalStorage';

const modes = {
  '.html': 'htmlmixed',
  '.css': 'css',
  '.js': 'jsx',
  '.md': 'markdown'
};
const getMode = extension => modes[extension];

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
    const { CodeMirror } = editorModules;
    console.log('here');
    setCodeMirror(
      new CodeMirror(ref.current, {
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
  }, [ref, editorModules]);

  // Update language mode and readOnly when active file changes.
  useEffect(() => {
    if (!codeMirror) return;
    codeMirror.setOption('mode', getMode(getExtension(activeFile)));
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

    const onTextChange = (instance, changeObj) => {
      const isRemote = changeObj.origin === 'remoteOp';
      const isInitialization = changeObj.origin === 'setValue';
      const isUserGenerated = !isRemote && !isInitialization;
      if (isUserGenerated) {
        submitVizContentOp(changeObjToOp(changeObj, path, codeMirror.getDoc()));
      }
    };

    codeMirror.on('change', onTextChange);
    return () => {
      codeMirror.off('change', onTextChange);
    };
  }, [codeMirror, submitVizContentOp, path]);

  // Initialize text and subscribe to changes.
  useEffect(() => {
    if (!realtimeModules || !codeMirror) {
      return;
    }
    const { json0 } = realtimeModules;

    const file = getVizFile(fileIndex)(viz$.getValue());

    // If the file does not exist at this point, it means that
    // we are accessing a URL that has a file "open" that doesn't exist,
    // either because it's been renamed or deleted.
    // In this case, we close the active file and bail out to avoid a crash.
    if (!file) {
      //closeActiveFile();
      return;
    }

    codeMirror.setValue(file.text);

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
