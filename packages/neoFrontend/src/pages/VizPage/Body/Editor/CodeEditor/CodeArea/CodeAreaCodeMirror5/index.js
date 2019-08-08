import React, {
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect
} from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/keymap/vim';
import { getVizFile } from '../../../../../../../accessors';
import { VizContext } from '../../../../../VizContext';
import { RealtimeModulesContext } from '../../../../../RealtimeModulesContext';
import { useFileIndex } from '../useFileIndex';
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
const getExtension = fileName => fileName.substr(fileName.lastIndexOf('.'));
const getMode = extension => modes[extension];

export const CodeAreaCodeMirror5 = ({ activeFile }) => {
  const ref = useRef();
  const [codeMirror, setCodeMirror] = useState();
  const [keyMap, setKeyMap] = useStateLocalStorage('keyMap', 'default');

  // Easter egg
  window.vizhub.enableVimMode = () => setKeyMap('vim');
  window.vizhub.disableVimMode = () => setKeyMap('default');

  const { viz$, submitVizContentOp, vizContentOp$ } = useContext(VizContext);
  const fileIndex = useFileIndex(viz$, activeFile);
  const path = usePath(fileIndex);
  const realtimeModules = useContext(RealtimeModulesContext);

  useEffect(() => {
    setCodeMirror(new CodeMirror(ref.current));
  }, [ref]);

  useEffect(() => {
    if (!codeMirror) {
      return;
    }
    codeMirror.setOption('mode', getMode(getExtension(activeFile)));
  }, [codeMirror, activeFile]);

  useEffect(() => {
    if (!codeMirror) {
      return;
    }
    codeMirror.setOption('keyMap', keyMap);
  }, [codeMirror, keyMap]);

  const onTextChange = useCallback(
    (instance, changeObj) => {
      if (changeObj.origin === 'setValue' || changeObj.origin === 'remoteOp') {
        return;
      }
      submitVizContentOp(changeObjToOp(changeObj, path, codeMirror.getDoc()));
    },
    [submitVizContentOp, path, codeMirror]
  );

  useEffect(() => {
    if (!realtimeModules || !codeMirror) {
      return;
    }
    const { json0 } = realtimeModules;

    // Initialize text.
    codeMirror.setValue(getVizFile(fileIndex)(viz$.getValue()).text);

    // Subscribe to changes.
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

  useEffect(() => {
    if (!codeMirror) {
      return;
    }

    codeMirror.on('change', onTextChange);
    return () => {
      codeMirror.off('change', onTextChange);
    };
  }, [codeMirror, onTextChange]);

  return (
    <>
      <CodeMirrorGlobalStyle />
      <Wrapper ref={ref} />
    </>
  );
};
