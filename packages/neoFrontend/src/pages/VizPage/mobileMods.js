import mobile from 'is-mobile';

// Modifications and tweaks to support mobile experience.

// Are we on mobile?
export const isMobile = mobile();

// The identity function.
const identity = x => x;

// On mobile, don't show viewer if editor is open.
export const modShowViewer = isMobile
  ? (showViewer, showEditor) => (showEditor ? false : showViewer)
  : identity;

// On mobile, don't show viz runner if editor is open.
export const modMode = isMobile
  ? (mode, showEditor) => (showEditor ? 'micro' : mode)
  : identity;

// On mobile, if editor is open, allow it to expand to full width.
export const expandEditor = showEditor => isMobile && showEditor;

// On mobile, don't show editor sidebar if a file is open.
export const modShowEditor = isMobile
  ? (showEditor, activeFile) => (activeFile ? false : showEditor)
  : identity;

// On mobile, if a file is open and you click "Close Editor",
// it will close the active file AND the editor (sidebar).
//export const modToggleEditor = isMobile
//  ? (toggleEditor, closeActiveFile) => () => {
//      toggleEditor();
//      closeActiveFile();
//    }
//  : identity;
