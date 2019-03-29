import React, { useRef, useEffect } from 'react';
import { useCodeMirror } from './useCodeMirror';
import { Wrapper, CodeMirrorGlobalStyle } from './styles';

export const Editor = ({ vizData, activeFileId }) => {
  const { text, path } = vizData.working.files[activeFileId];
  const extension = path.substr(path.lastIndexOf('.') + 1);
  const view = useCodeMirror(activeFileId, text, extension);
  const ref = useRef();

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
