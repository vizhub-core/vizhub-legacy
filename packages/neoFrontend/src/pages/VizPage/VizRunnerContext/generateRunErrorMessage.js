// Inspired by https://github.com/rollup/rollup/blob/master/bin/src/logging.ts
export const generateRunErrorMessage = error => {
  const lines = [];

  let message = error.message || error;
  if (error.name) {
    message = `${error.name}: ${message}`;
  }

  lines.push(`${message.toString()}`);

  if (error.url) {
    lines.push(error.url);
  }

  if (error.loc) {
    lines.push(`${error.loc.file || error.id} (line ${error.loc.line})`);
  } else if (error.id) {
    lines.push(error.id);
  }

  if (error.frame) {
    lines.push(error.frame);
  }

  // if (error.stack) {
  //   lines.push(error.stack);
  // }

  lines.push('(bundle.js not updated)');

  return lines.join('\n');
};
