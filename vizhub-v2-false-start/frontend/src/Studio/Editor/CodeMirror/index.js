import React, { useRef, useEffect } from 'react';
import { useCodeMirror } from './useCodeMirror';
import { Wrapper, CodeMirrorGlobalStyle } from './styles';

export const CodeMirror = ({ initialDoc }) => {
  const ref = useRef();
  const view = useCodeMirror(initialDoc);

  useEffect(() => {
    if (view) {
      ref.current.appendChild(view.dom);
    }
  }, [view]);

  const focusCodeMirror = () => {
    view.focus();
  };

  return (
    <>
      <CodeMirrorGlobalStyle />
      <Wrapper onClick={focusCodeMirror} ref={ref} />
    </>
  );
};
