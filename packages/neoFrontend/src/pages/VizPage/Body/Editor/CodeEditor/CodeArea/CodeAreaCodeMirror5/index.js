import React, { useState, useContext, useRef, useEffect } from 'react';
import { getVizFile, getExtension } from '../../../../../../../accessors';
import { LoadingScreen } from '../../../../../../../LoadingScreen';
import { VizContext } from '../../../../../VizContext';
import { RunContext } from '../../../../../RunContext';
import { RealtimeModulesContext } from '../../../../../RealtimeModulesContext';
import { EditorModulesContext } from '../../../../../EditorModulesContext';
import { useFileIndex } from '../useFileIndex';
import { light } from '../../../themes/vizHub';
import { usePath } from '../usePath';
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

export const CodeAreaCodeMirror5 = ({ activeFile }) => {
  const ref = useRef();
  const [codeMirror, setCodeMirror] = useState();
  const [keyMap, setKeyMap] = useStateLocalStorage('keyMap', 'default');

  // Easter egg
  window.vizhub.enableVimMode = () => setKeyMap('vim');
  window.vizhub.disableVimMode = () => setKeyMap('default');

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
    setCodeMirror(new editorModules.CodeMirror(ref.current));
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
    codeMirror.setOption('keyMap', keyMap);
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

    codeMirror.setValue(getVizFile(fileIndex)(viz$.getValue()).text);

    const subscription = vizContentOp$.subscribe(
      ({ previousContent, nextContent, op, originatedLocally }) => {
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
