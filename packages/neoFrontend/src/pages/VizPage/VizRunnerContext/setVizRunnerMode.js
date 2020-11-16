import { Z_ABOVE, Z_WAY_ABOVE, Z_WAY_WAY_ABOVE } from '../../../styles';
import { theme } from '../../../theme/defaultTheme';
import { useTransitions } from '../../../constants';
import { modes } from '../URLStateContext/modes';

// The number of milliseconds to transition when
// moving the iframe whenever the mode changes.
const transitionDuration = useTransitions ? 500 : 0;

// The previously set mode.
let mode;

// The id of the ongoing timeout for transitioning.
let timeoutId;

const setStyles = (iFrame, newMode) => {
  // If in "mini" or "micro" mode, set Z index high.
  iFrame.style['z-index'] =
    newMode === modes.mini || newMode === modes.micro
      ? Z_WAY_WAY_ABOVE
      : Z_ABOVE;

  // If not in "fullscreen" newMode, set shadow.
  iFrame.style['box-shadow'] =
    newMode === modes.full ? 'none' : theme.shadowLight;
};

// 'mode' here means the context in which the viz content is being viewed.
// For example, it could be 'viewer' if it's shown in the viz viewer section,
// it could be 'full' if it's shown in full screen mode,
// or it could be 'mini' if it's shown in the mini view atop the code editor.
export const setVizRunnerMode = (iFrame, newMode) => {
  const modeChanged = mode !== newMode;

  // Short circuit in degenerate case.
  if (!modeChanged) {
    return;
  }

  // iframe is not needed in snippet mode, hide and short circuit
  if (newMode === modes.snippet) {
    iFrame.style.display = 'none';
    setStyles(iFrame, newMode);
    return;
  }

  // Are we transitioning into 'hide' mode?
  const hiding = newMode === modes.hide;

  // Are we transitioning out of 'hide' mode?
  const showing = mode === modes.hide && modeChanged;

  // Did we just get our first mode of the day (page load)?
  const initializing = mode === undefined;

  // Record the new mode as the old mode for future comparison.
  mode = newMode;

  // Do not animate if showing or hiding.
  if (showing || hiding) {
    iFrame.style.visibility = showing ? 'visible' : 'hidden';
    setStyles(iFrame, newMode);
    return;
  }

  if (initializing) {
    setStyles(iFrame, newMode);
    return;
  }

  // Animate if mode changed,
  // but not if mode was just first initialized,
  if (modeChanged) {
    // Make sure viz content is above everything else while transitioning.
    // Unless we're transitioning to full screen, because in that case
    // the footer should be above the viz content, even in transition.
    if (mode !== 'full') {
      iFrame.style['z-index'] = Z_WAY_ABOVE;
    }

    // Lose the shadow for transition, for performance.
    iFrame.style['box-shadow'] = 'none';

    // Set the transition duration before setting properties, so they animate.
    if (useTransitions) {
      iFrame.style['transition-duration'] = transitionDuration + 'ms';
    }

    // Clear previous timeout, in case the mode changes multiple times
    // within the transitionDuration time window.
    clearTimeout(timeoutId);

    // Wait for the transition to finish.
    timeoutId = setTimeout(() => {
      setStyles(iFrame, newMode);

      // Make future updates happen instantly.
      iFrame.style['transition-duration'] = '0ms';
    }, transitionDuration);
  }
};
