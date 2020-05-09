import React, { useContext, useEffect, useRef, useCallback } from 'react';
import { VizContext } from '../../../../../VizContext';
import { getVizFile } from '../../../../../../../accessors';
import { RealtimeModulesContext } from '../../../../../RealtimeModulesContext';
import { usePath } from '../usePath';
import { Wrapper } from './styles';
import { fileChangeOp } from '../fileChangeOp';
import { useFileIndex } from '../useFileIndex';

export const CodeAreaTextarea = ({ activeFile }) => {
  const { viz$, submitVizContentOp, vizContentOp$ } = useContext(VizContext);

  const fileIndex = useFileIndex(viz$, activeFile);

  const path = usePath(fileIndex);

  const allowEditing = submitVizContentOp ? true : false;
  const realtimeModules = useContext(RealtimeModulesContext);

  const onTextChange = useCallback(
    (event) => {
      const newText = event.target.value;
      const oldText = getVizFile(fileIndex)(viz$.getValue()).text;
      submitVizContentOp(
        fileChangeOp(fileIndex, oldText, newText, realtimeModules)
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

  useEffect(() => {
    if (!realtimeModules) {
      return;
    }
    const { json0 } = realtimeModules;
    const textarea = ref.current;

    // Initialize text.
    textarea.value = getVizFile(fileIndex)(viz$.getValue()).text;

    // Subscribe to changes.
    const subscription = vizContentOp$.subscribe(
      ({ previous, next, op, originatedLocally }) => {
        if (!originatedLocally) {
          op.forEach((c) => {
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
    return () => {
      subscription.unsubscribe();
    };
  }, [viz$, ref, vizContentOp$, realtimeModules, path, fileIndex]);

  return (
    <Wrapper
      className="test-codearea-textarea"
      ref={ref}
      onChange={onTextChange}
      readOnly={!allowEditing}
    />
  );
};
