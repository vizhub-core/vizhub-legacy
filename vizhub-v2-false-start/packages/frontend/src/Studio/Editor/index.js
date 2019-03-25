import React, { useRef, useEffect } from 'react';
import { useCodeMirror } from './useCodeMirror';
import { Wrapper, CodeMirrorGlobalStyle } from './styles';
import { findActiveFileId } from 'vizhub-core';

export const Editor = ({ vizData, activeFileName }) => {
  const ref = useRef();

  let id, text;
  if (vizData && activeFileName) {
    id = findActiveFileId(vizData, activeFileName);
    text = vizData.working.files[id].text;
  }

  const view = useCodeMirror(id, text);

  useEffect(() => {
    if (view) {
      ref.current.appendChild(view.dom);
      return () => {
        ref.current.removeChild(view.dom);
      };
    }
  }, [view]);

  const focusEditor = () => {
    view.focus();
  };

  return (
    <>
      <CodeMirrorGlobalStyle />
      <Wrapper onClick={focusEditor} ref={ref} />
    </>
  );
};
