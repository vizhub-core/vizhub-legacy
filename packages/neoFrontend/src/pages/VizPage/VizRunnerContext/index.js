import React, { createContext, useContext, useRef, useEffect } from 'react';
import { Z_BELOW } from '../../../styles';
import {
  getMicroScale,
  getMicroWidth,
  getVizHeight,
  vizWidth,
  getVizFiles,
  computeSrcDoc,
} from 'vizhub-presenters';
import { clearConsole } from '../../../constants';
import { useValue } from '../../../useValue';
import { modMode } from '../../../mobileMods';
import { VizContext } from '../VizContext';
import { SplitPaneResizeContext } from '../SplitPaneResizeContext';
import { RunContext } from '../RunContext';
import { PrettierContext } from '../PrettierContext';
import { URLStateContext } from '../URLStateContext';
import { setVizRunnerMode } from './setVizRunnerMode';
import { generateErrorMessageSrcDoc } from './generateErrorMessageSrcDoc';
import { generateRunErrorMessage } from './generateRunErrorMessage';

export const VizRunnerContext = createContext();

// Yes, this will be lying around all the time, doing no harm.
// This is a singleton on the page. There will ever only be one.
const iFrame = document.createElement('iframe');

iFrame.setAttribute('width', vizWidth);

iFrame.style.position = 'fixed';
iFrame.style.border = 0;
iFrame.style.top = '0px';
iFrame.style.left = '0px';
iFrame.style['transform-origin'] = '0 0';
iFrame.style['z-index'] = Z_BELOW;
iFrame.style['background-color'] = '#ffffff';
iFrame.style['transition-property'] = 'transform';
iFrame.style['transition-timing-function'] = 'cubic-bezier(.28,.66,.15,1)';

// Move the iframe to the new (x, y, scale).
const setVizRunnerTransform = ({ x, y, scale }) => {
  iFrame.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;

  // iFrame.style.transform = `scale(${scale})`;
  // iFrame.style.top = `${y}px`;
  // iFrame.style.left = `${x}px`;
};

export const VizRunnerProvider = ({ children }) => {
  const { viz$, pending } = useContext(VizContext);
  const { mode, showEditor, activeFile, isRecoveryMode } = useContext(
    URLStateContext
  );

  const vizHeight = useValue(viz$, getVizHeight);
  const { runId, runError } = useContext(RunContext);
  const { prettierError } = useContext(PrettierContext);

  const ref = useRef();

  const mod = modMode(mode, showEditor, activeFile);
  setVizRunnerMode(iFrame, mod);

  if (mod === 'micro') {
    const scale = getMicroScale(vizHeight);
    const x = window.innerWidth - getMicroWidth(scale);
    const y = 0;
    setVizRunnerTransform({ x, y, scale });
  }

  const contextValue = { pending, setVizRunnerTransform };

  useEffect(() => {
    if (runError) {
      const errorMessage = generateRunErrorMessage(runError);
      console.error(errorMessage + '\n(bundle.js not updated)');
      iFrame.setAttribute('srcDoc', generateErrorMessageSrcDoc(errorMessage));
    } else if (prettierError) {
      console.error(prettierError.message);
      iFrame.setAttribute(
        'srcDoc',
        generateErrorMessageSrcDoc(prettierError.message, false)
      );
    } else if (isRecoveryMode) {
      // Do nothing, to allow user to fix their code in "recovery mode".
    } else {
      if (clearConsole) {
        console.clear();
      }

      iFrame.setAttribute(
        'srcDoc',
        computeSrcDoc(getVizFiles(viz$.getValue()))
      );
    }
  }, [viz$, runId, runError, prettierError, isRecoveryMode]);

  useEffect(() => {
    iFrame.setAttribute('height', vizHeight);
  }, [vizHeight]);

  // Disable pointer events when split pane is being dragged.
  // Otherwise, they do interfere with dragging the split pane.
  const { isDragging } = useContext(SplitPaneResizeContext);
  useEffect(() => {
    iFrame.style['pointer-events'] = isDragging ? 'none' : 'all';
  }, [isDragging]);

  useEffect(() => {
    const div = ref.current;
    div.appendChild(iFrame);
    return () => {
      iFrame.srcDoc = '';
      div.removeChild(iFrame);
    };
  }, [ref]);

  return (
    <div ref={ref}>
      <VizRunnerContext.Provider value={contextValue}>
        {children}
      </VizRunnerContext.Provider>
    </div>
  );
};
