import mobile from 'is-mobile';
import { MiniSVG, MicroSVG } from './svg';

// Modifications and tweaks to support mobile experience.

// Are we on mobile?
export const isMobile = mobile();

// The identity function.
const identity = (x) => x;

// On mobile, don't show viewer if editor is open.
export const modShowViewer = isMobile
  ? (showViewer, showEditor, activeFile) =>
      showEditor || activeFile ? false : showViewer
  : identity;

// On mobile, don't show viz runner if editor is open.
export const modMode = isMobile
  ? (mode, showEditor, activeFile) =>
      showEditor || activeFile ? 'micro' : mode
  : identity;

// On mobile, if editor is open, allow it to expand to full width.
export const modExpandEditor = isMobile
  ? (showEditor) => showEditor
  : () => false;

// On mobile, don't show editor sidebar if a file is open.
export const modShowEditor = isMobile
  ? (showEditor, activeFile) => (activeFile ? false : showEditor)
  : identity;

export const MiniOrMicroSVG = isMobile ? MicroSVG : MiniSVG;
