// Computes the file extension from the file path.
const extension = path => path.substr(path.lastIndexOf('.') + 1);

// Set up the mode based on the file extension, for syntax highlighting.
export const useMode = (CodeMirror, filePath) => {
  if (!CodeMirror) return;
  const { legacyMode, javascript, css } = CodeMirror;
  const modesByExtension = { js: javascript, css };
  const modeOfExtension = modesByExtension[extension(filePath)] || javascript;
  return legacyMode({ mode: modeOfExtension({ indentUnit: 2 }, {}) });
};
