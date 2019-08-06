import React, {
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect
} from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import { getVizFile } from '../../../../../../../accessors';
import { VizContext } from '../../../../../VizContext';
import { RealtimeModulesContext } from '../../../../../RealtimeModulesContext';
import { useFileIndex } from '../useFileIndex';
import { usePath } from '../usePath';
import { Wrapper } from './styles';
import { changeObjToOp } from './changeObjToOp';

export const CodeAreaCodeMirror5 = ({ activeFile }) => {
  const ref = useRef();
  const [codeMirror, setCodeMirror] = useState();

  const { viz$, submitVizContentOp, vizContentOp$ } = useContext(VizContext);
  const fileIndex = useFileIndex(viz$, activeFile);
  const path = usePath(fileIndex);
  const realtimeModules = useContext(RealtimeModulesContext);

  useEffect(() => {
    setCodeMirror(new CodeMirror(ref.current));
  }, [ref]);

  const onTextChange = useCallback(
    (instance, changeObj) => {
      if (changeObj.origin === 'setValue') {
        return;
      }
      console.log(changeObj);
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
        console.log(originatedLocally);
        if (!originatedLocally) {
          const doc = codeMirror.getDoc();
          op.forEach(c => {
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

  return <Wrapper ref={ref} />;
};
