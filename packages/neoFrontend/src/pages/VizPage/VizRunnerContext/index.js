import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect
} from 'react';
import { VizPageDataContext } from '../VizPageDataContext';
import { defaultVizHeight, vizWidth } from '../../../constants';
import { theme } from '../../../theme';
import { Z_BELOW, Z_WAY_ABOVE } from '../../../styles';

const srcDoc = `<style>body { background-color: pink; }</style>`;
export const VizRunnerContext = createContext();

// Yes, this will be lying around all the time, doing no harm.
// This is a singleton on the page. There will ever only be one.
const iFrame = document.createElement('iframe');

iFrame.setAttribute('srcDoc', srcDoc);
iFrame.setAttribute('width', vizWidth);
iFrame.style.position = 'fixed';
iFrame.style.border = 0;
iFrame.style['transform-origin'] = '0 0';
iFrame.style['z-index'] = Z_BELOW;
iFrame.style['background-color'] = '#ffffff';
iFrame.style['box-shadow'] = theme.shadowLight;

iFrame.style['transition-property'] = 'top, left, transform';

const transitionDuration = 500;
const transitionDurationMS = transitionDuration + 'ms';
const zeroMS = '0ms';

let previousMode;
let transitionTimeoutId;
let modeChangedRecently;

export const VizRunnerProvider = ({ children }) => {
  const { visualization } = useContext(VizPageDataContext);
  const vizHeight = visualization.info.height || defaultVizHeight;
  const ref = useRef();

  // 'mode' here means the context in which the viz content is being viewed.
  // For example, it could be 'viewer' if it's shown in the viz viewer section,
  // it could be 'fullscreen' if it's shown in full screen mode,
  // or it could be 'mini' if it's shown in the mini view atop the code editor.
  const setVizRunnerTransform = useCallback(({ x, y, scale, mode }) => {
    // Detect if the mode changed, so we can trigger a transition if it did.
    const modeChanged = previousMode && previousMode !== mode;
    previousMode = mode;

    // Make sure the viz content is above everything else
    // while it is being animated.
    if (modeChanged) {
      iFrame.style['z-index'] = Z_WAY_ABOVE;
      clearTimeout(transitionTimeoutId);
      transitionTimeoutId = setTimeout(() => {
        iFrame.style['z-index'] = Z_BELOW;
      }, transitionDuration);
    }

    // Handle the case of when the switch to viewer mode introduces a vertical scrollbar.
    // Since the measuring happens twice, one synchronous and one after an animation frame,
    // we need to make sure that the second measure (after an animation frame)
    // doesn't interrupt the visual transition. So we need to wait 2 animation frames.
    if (modeChanged) {
      modeChangedRecently = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          modeChangedRecently = false;
        });
      });
    }

    // Animate smoothly when the mode changes.
    // Do not animate if the mode did not change (e.g. on scroll or resize).
    iFrame.style['transition-duration'] = modeChangedRecently
      ? transitionDurationMS
      : zeroMS;

    // Move the iframe to the new (x, y, scale).
    iFrame.style.transform = `scale(${scale})`;
    iFrame.style.top = `${y}px`;
    iFrame.style.left = `${x}px`;
  }, []);

  const contextValue = { setVizRunnerTransform };

  useEffect(() => {
    iFrame.setAttribute('height', vizHeight);
  }, [vizHeight]);

  useEffect(() => {
    const div = ref.current;
    div.appendChild(iFrame);
    return () => {
      // TODO clean up srcDoc here?
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
