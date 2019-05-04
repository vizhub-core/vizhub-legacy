const modeNameByExtension = {
  js: 'javascript',
  css: 'css',
  html: 'xml' // TODO change to html
};

// Set up the mode based on the file extension, for syntax highlighting.
export const useMode = (CodeMirror, fileExtension) => {
  if (!CodeMirror) return;
  const { legacyMode, legacyModes } = CodeMirror;

  const modeName = modeNameByExtension[fileExtension];
  const modeOfExtension = legacyModes[modeName];

  return legacyMode({
    mode: modeOfExtension({ indentUnit: 2 }, {})
  });
};
