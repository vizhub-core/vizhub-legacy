import React, { createContext, useContext, useRef, useEffect } from 'react';
import { VizPageDataContext } from '../VizPageDataContext';
import { defaultVizHeight, vizWidth } from '../../../constants';
import { theme } from '../../../theme';
import { Z_BELOW, Z_WAY_ABOVE } from '../../../styles';
import { useListener } from '../useListener';

const srcDoc = `<style>body { background-color: pink; }</style>`;
export const VizRunnerContext = createContext();

// Yes, this will be lying around all the time, doing no harm.
// This is a singleton on the page. There will ever only be one.
const iFrame = document.createElement('iframe');

iFrame.setAttribute('srcDoc', srcDoc);
iFrame.setAttribute('width', vizWidth);

// TODO consider putting these in a CSS class?
iFrame.style.position = 'fixed';
iFrame.style.border = 0;
iFrame.style['transform-origin'] = '0 0';
iFrame.style['z-index'] = Z_BELOW;
iFrame.style['background-color'] = '#ffffff';
iFrame.style['box-shadow'] = theme.shadowLight;
iFrame.style['transition-property'] = 'top, left, transform';

// The number of milliseconds to transition when
// moving the iframe whenever the mode changes.
const transitionDuration = 500;
const transitionDurationMS = transitionDuration + 'ms';
const zeroMS = '0ms';

let previousMode;
let timeoutId;

const setVizRunnerMode = mode => {
  console.log('setVizRunnerMode, mode = ' + mode);
  if (mode === 'hide') {
    iFrame.style.visibility = 'hidden';
    return;
  }
  // Transition smoothly when the mode changes.
  // Check previousMode so we don't transition on first render.
  const modeChanged = previousMode && previousMode !== mode;
  previousMode = mode;

  if (modeChanged) {
    // Make sure viz content is above everything else while transitioning.
    iFrame.style['z-index'] = Z_WAY_ABOVE;

    // Set the transition duration before setting properties, so they animate.
    iFrame.style['transition-duration'] = transitionDurationMS;

    // Clear previous timeout, in case the mode changes multiple times
    // within the transitionDuration time window.
    clearTimeout(timeoutId);

    // Wait for the transition to finish.
    timeoutId = setTimeout(() => {
      // Pop the content back under other things,
      // where it should be normally.
      iFrame.style['z-index'] = Z_BELOW;

      // Set this to zero so future updates happen instantly
      iFrame.style['transition-duration'] = zeroMS;
    }, transitionDuration);
  }
};

const onVizModeChange = event => setVizRunnerMode(event.detail);

// 'mode' here means the context in which the viz content is being viewed.
// For example, it could be 'viewer' if it's shown in the viz viewer section,
// it could be 'full' if it's shown in full screen mode,
// or it could be 'mini' if it's shown in the mini view atop the code editor.
const setVizRunnerTransform = ({ x, y, scale, mode }) => {
  if (mode) {
    //setVizRunnerMode(mode);
    //throw new Error();
  }

  // Move the iframe to the new (x, y, scale).
  iFrame.style.transform = `scale(${scale})`;
  iFrame.style.top = `${y}px`;
  iFrame.style.left = `${x}px`;
};

export const VizRunnerProvider = ({ children }) => {
  const { visualization } = useContext(VizPageDataContext);
  const vizHeight = visualization.info.height || defaultVizHeight;
  const ref = useRef();

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

  useListener('vizModeChange', onVizModeChange);

  return (
    <div ref={ref}>
      <VizRunnerContext.Provider value={contextValue}>
        {children}
      </VizRunnerContext.Provider>
    </div>
  );
};
