import React, { createContext, useContext, useRef, useEffect } from 'react';
import { VizPageDataContext } from '../VizPageDataContext';
import { URLStateContext } from '../URLStateContext';
import { defaultVizHeight, vizWidth } from '../../../constants';
import { theme } from '../../../theme';
import { Z_BELOW, Z_WAY_ABOVE } from '../../../styles';

// The number of milliseconds to transition when
// moving the iframe whenever the mode changes.
const transitionDuration = 500;

const srcDoc = `<style>body { background-color: pink; }</style>`;
export const VizRunnerContext = createContext();

// Yes, this will be lying around all the time, doing no harm.
// This is a singleton on the page. There will ever only be one.
const iFrame = document.createElement('iframe');

iFrame.setAttribute('srcDoc', srcDoc);
iFrame.setAttribute('width', vizWidth);

iFrame.style.position = 'fixed';
iFrame.style.border = 0;
iFrame.style.top = `0px`;
iFrame.style.left = `0px`;
iFrame.style['transform-origin'] = '0 0';
iFrame.style['z-index'] = Z_BELOW;
iFrame.style['background-color'] = '#ffffff';
iFrame.style['box-shadow'] = theme.shadowLight;
iFrame.style['transition-property'] = 'transform';
iFrame.style['transition-timing-function'] = 'cubic-bezier(.28,.66,.15,1)';

let mode;
let timeoutId;

// 'mode' here means the context in which the viz content is being viewed.
// For example, it could be 'viewer' if it's shown in the viz viewer section,
// it could be 'full' if it's shown in full screen mode,
// or it could be 'mini' if it's shown in the mini view atop the code editor.
const setVizRunnerMode = newMode => {
  const modeChanged = mode !== newMode;

  // Short circuit in degenerate case.
  if (!modeChanged) {
    return;
  }

  // Are we transitioning into 'hide' mode?
  const hiding = newMode === 'hide';

  // Are we transitioning out of 'hide' mode?
  const showing = mode === 'hide' && modeChanged;

  // Did we just get our first mode of the day (page load)?
  const initializing = mode === undefined;

  // Record the new mode as the old mode for future comparison.
  mode = newMode;

  // Do not animate if showing or hiding.
  if (showing || hiding) {
    iFrame.style.visibility = showing ? 'visible' : 'hidden';
    return;
  }

  // Animate if mode changed,
  // but not if mode was just first initialized,
  if (!initializing && modeChanged) {
    // Make sure viz content is above everything else while transitioning.
    iFrame.style['z-index'] = Z_WAY_ABOVE;

    // Set the transition duration before setting properties, so they animate.
    iFrame.style['transition-duration'] = transitionDuration + 'ms';

    // Clear previous timeout, in case the mode changes multiple times
    // within the transitionDuration time window.
    clearTimeout(timeoutId);

    // Wait for the transition to finish.
    timeoutId = setTimeout(() => {
      // Pop the content back under other things,
      // where it should be normally,
      // unless it's in 'mini' mode.
      if (mode !== 'mini') {
        iFrame.style['z-index'] = Z_BELOW;
      }

      // Make future updates happen instantly.
      iFrame.style['transition-duration'] = '0ms';
    }, transitionDuration);
  }
};

// Move the iframe to the new (x, y, scale).
const setVizRunnerTransform = ({ x, y, scale }) => {
  iFrame.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;

  // iFrame.style.transform = `scale(${scale})`;
  // iFrame.style.top = `${y}px`;
  // iFrame.style.left = `${x}px`;
};

export const VizRunnerProvider = ({ children }) => {
  const { visualization } = useContext(VizPageDataContext);
  const { mode } = useContext(URLStateContext);
  const vizHeight = visualization.info.height || defaultVizHeight;
  const ref = useRef();

  setVizRunnerMode(mode);

  const contextValue = { setVizRunnerTransform };

  useEffect(() => {
    iFrame.setAttribute('height', vizHeight);
  }, [vizHeight]);

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
