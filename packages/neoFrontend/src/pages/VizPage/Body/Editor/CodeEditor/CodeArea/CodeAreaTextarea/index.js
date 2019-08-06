import React, { useMemo, useContext, useEffect, useRef, useCallback } from 'react';
import { VizContext } from '../../../../../VizContext';
import { getVizFile } from '../../../../../../../accessors';
import { useValue } from '../../../../../../../useValue';
import { Wrapper } from './styles';
import { RealtimeModulesContext } from '../../../../../RealtimeModulesContext';
import { generateFileChangeOp } from '../generateFileChangeOp';

const onFileChange = (
  oldText,
  fileIndex,
  submitVizOp,
  realtimeModules
) => newText => {
  submitVizOp(
    generateFileChangeOp(fileIndex, oldText, newText, realtimeModules)
  );
};

export const CodeAreaTextarea = ({ activeFile }) => {
  const { viz$, submitVizContentOp, vizContentOp$ } = useContext(VizContext);

  const getActiveFile = useCallback(getVizFile(activeFile), [activeFile]);

  const { file, fileIndex } = useValue(viz$, getActiveFile);

  const path = useMemo(() => ['files', fileIndex, 'text'], [fileIndex]);

  const { text } = file;
  const allowEditing = submitVizContentOp ? true : false;
  const realtimeModules = useContext(RealtimeModulesContext);

  // TODO useCallback
  const onTextChange = onFileChange(
    text,
    fileIndex,
    submitVizContentOp,
    realtimeModules
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
    if(!subscribed.current){
      ref.current.value = text;
    }
  }, [ref, text, subscribed]);

  // Subscribe to changes.
  useEffect(() => {
    if(!realtimeModules){
      return;
    }
    const { json0 } = realtimeModules;
    const textarea = ref.current;
    const subscription = vizContentOp$.subscribe(
      ({ previousContent, nextContent, op, originatedLocally }) => {
        if(!originatedLocally){
          op.forEach(c => {
            if (json0.canOpAffectPath(c, path)) {
              const i = c.p[c.p.length - 1];
              if(c.si){
                textarea.setRangeText(c.si, i, i);
              } else if(c.sd){
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
    }
  }, [ref, vizContentOp$, realtimeModules, path]);

  // Test for cursor transform.
  useEffect(() => {
    if (!submitVizContentOp) {
      return;
    }
    document.addEventListener('keydown', e => {
      if (e.altKey && e.code === 'KeyD') {
        setInterval(() => {
          submitVizContentOp({ si: 'e', p: ['files', 1, 'text', 5] });
        }, 1000);
      }
    });
  }, [submitVizContentOp]);

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
