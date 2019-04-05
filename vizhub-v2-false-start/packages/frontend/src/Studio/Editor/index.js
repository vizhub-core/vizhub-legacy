import React, { useRef, useEffect, useContext } from 'react';
import { VizContext } from '../../contexts';
import { useCodeMirror } from './useCodeMirror';
import { Wrapper, CodeMirrorGlobalStyle } from './styles';

const extension = path => path.substr(path.lastIndexOf('.') + 1);

export const Editor = ({ activeFileId }) => {
  const viz = useContext(VizContext);

  const { text, path } = viz.data.working.files[activeFileId];
  const view = useCodeMirror(activeFileId, {
    text,
    extension: extension(path),
    emitOps: viz.submitOp.bind(viz)
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
