// Computes the file extension from the file path.
const extension = path => path.substr(path.lastIndexOf('.') + 1);

const modeNameByExtension = {
  js: 'javascript',
  css: 'css',
  html: 'xml' // TODO change to html
};

// Set up the mode based on the file extension, for syntax highlighting.
export const useMode = (CodeMirror, filePath) => {
  if (!CodeMirror) return;
  const { legacyMode, legacyModes } = CodeMirror;

  const modeName = modeNameByExtension[extension(filePath)];
  const modeOfExtension = legacyModes[modeName];

  console.log({modeOfExtension});

  return legacyMode({
    mode: modeOfExtension({ indentUnit: 2 }, {})
  });
};
