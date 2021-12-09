import CodeMirror from 'codemirror';
import { parseNumberSequenceString } from '../../../../utils/number';
import { median } from '../../../../utils/array';

const codeMirrorActivelineClassName = 'CodeMirror-activeline-background';

const getLinesFronSequenceString = (sequenceString, firstLineNumber) =>
  parseNumberSequenceString(sequenceString).map(
    (line) => line - firstLineNumber
  );

CodeMirror.defineDocExtension(
  'highlightLines',
  function (sequenceString, highlightScrollStrategy) {
    // TODO: need to validate that mimimal sequence num not less than firstLineNumber
    // if it is less throw an error
    const firstLineNumber = this.cm.options.firstLineNumber;
    const lines = getLinesFronSequenceString(sequenceString, firstLineNumber);

    lines.forEach((line) => {
      this.addLineClass(line, 'wrap', codeMirrorActivelineClassName);
    });

    if (highlightScrollStrategy !== 'none') {
      const line =
        highlightScrollStrategy === 'center' ? median(lines) : lines[0];
      const linePosition = this.cm.heightAtLine(line, 'local');
      const topMargin =
        highlightScrollStrategy === 'center'
          ? this.cm.getScrollerElement().offsetHeight / 2
          : 0;
      this.cm.scrollTo(null, linePosition - topMargin);
    }

    return lines;
  }
);

CodeMirror.defineDocExtension('unhighlightLines', function (sequenceString) {
  // TODO: need to validate that mimimal sequence num not less than firstLineNumber
  // if it is less throw an error
  const firstLineNumber = this.cm.options.firstLineNumber;
  const lines = getLinesFronSequenceString(sequenceString, firstLineNumber);

  lines.forEach((line) => {
    this.removeLineClass(line, 'wrap', codeMirrorActivelineClassName);
  });

  return lines;
});
