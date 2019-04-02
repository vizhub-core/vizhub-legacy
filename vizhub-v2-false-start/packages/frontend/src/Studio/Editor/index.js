import React, { useRef, useEffect } from 'react';
import { useCodeMirror } from './useCodeMirror';
import { Wrapper, CodeMirrorGlobalStyle } from './styles';

const extension = path => path.substr(path.lastIndexOf('.') + 1);

export const Editor = ({ vizData, activeFileId }) => {
  const { text, path } = vizData.working.files[activeFileId];
  const view = useCodeMirror(activeFileId, {
    text,
    extension: extension(path),
    emitOps: ops => {
      console.log('emit');
      console.log(JSON.stringify(ops));
    }
  });
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
