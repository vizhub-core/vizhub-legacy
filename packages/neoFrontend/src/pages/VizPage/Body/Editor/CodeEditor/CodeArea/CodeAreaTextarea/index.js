import React, {
  useMemo,
  useContext,
  useEffect,
  useRef,
  useCallback
} from 'react';
import { VizContext } from '../../../../../VizContext';
import { getVizFile, getVizFileIndex } from '../../../../../../../accessors';
import { useValue } from '../../../../../../../useValue';
import { Wrapper } from './styles';
import { RealtimeModulesContext } from '../../../../../RealtimeModulesContext';
import { generateFileChangeOp } from '../generateFileChangeOp';

export const CodeAreaTextarea = ({ activeFile }) => {
  const { viz$, submitVizContentOp, vizContentOp$ } = useContext(VizContext);

  const getActiveFileIndex = useCallback(getVizFileIndex(activeFile), [
    activeFile
  ]);

  // TODO bad smell - conflating index and file
  // solution - separate into distinct things
  const fileIndex = useValue(viz$, getActiveFileIndex);

  const getActiveFile = useCallback(getVizFile(fileIndex), [fileIndex]);

  const file = useValue(viz$, getActiveFile);

  const path = useMemo(() => ['files', fileIndex, 'text'], [fileIndex]);

  const { text } = file;
  const allowEditing = submitVizContentOp ? true : false;
  const realtimeModules = useContext(RealtimeModulesContext);

  // TODO bad smell - depends on text state, produces many closures on each keystroke
  // solution - extract value from stream current value.
  const onTextChange = useCallback(
    newText => {
      const viz = viz$.getValue();
      // TODO refactor to getVizFile(viz, fileIndex).text;
      const oldText = viz.content.files[fileIndex].text;
      submitVizContentOp(
        generateFileChangeOp(fileIndex, oldText, newText, realtimeModules)
      );
    },
    [viz$, fileIndex, submitVizContentOp, realtimeModules]
  );

  const ref = useRef();

  // TODO submit presence
  // onSelect={updateSelection}
  //const updateSelection = () => {
  //  const { selectionStart, selectionEnd } = ref.current;
  //  console.log({selectionStart, selectionEnd});
  //};
  const subscribed = useRef(false);

  // Initialize text.
  useEffect(() => {
    if (!subscribed.current) {
      ref.current.value = text;
    }
  }, [ref, text, subscribed]);

  // Subscribe to changes.
  useEffect(() => {
    if (!realtimeModules) {
      return;
    }
    const { json0 } = realtimeModules;
    const textarea = ref.current;
    const subscription = vizContentOp$.subscribe(
      ({ previousContent, nextContent, op, originatedLocally }) => {
        if (!originatedLocally) {
          op.forEach(c => {
            if (json0.canOpAffectPath(c, path)) {
              const i = c.p[c.p.length - 1];
              if (c.si) {
                textarea.setRangeText(c.si, i, i);
              } else if (c.sd) {
                textarea.setRangeText('', i, i + c.sd.length);
              }
            }
          });
        }
      }
    );
    subscribed.current = true;
    return () => {
      subscription.unsubscribe();
      subscribed.current = false;
    };
  }, [ref, vizContentOp$, realtimeModules, path]);

  // Manual test for cursor transform.
  useEffect(() => {
    if (!submitVizContentOp) {
      return;
    }
    document.addEventListener('keydown', e => {
      if (e.altKey && e.code === 'KeyD') {
        setInterval(() => {
          submitVizContentOp({ si: 'e', p: ['files', fileIndex, 'text', 5] });
        }, 1000);
      }
    });
  }, [submitVizContentOp, fileIndex]);

  return (
    <Wrapper
      className="test-codearea-textarea"
      ref={ref}
      onChange={event => {
        onTextChange(event.target.value);
      }}
      readOnly={!allowEditing}
    />
  );
};
