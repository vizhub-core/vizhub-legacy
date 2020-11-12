import CodeMirror from 'codemirror';
import { parseNumberSequenceString } from '../../../../utils/number';

const codeMirrorActivelineClassName = 'CodeMirror-activeline-background';

const getLinesFronSequenceString = (sequenceString, firstLineNumber) =>
  parseNumberSequenceString(sequenceString).map((line) => line - firstLineNumber);

CodeMirror.defineDocExtension('highlightLines', function (sequenceString, firstLineNumber) {
  const lines = getLinesFronSequenceString(sequenceString, firstLineNumber);

  lines.forEach((line) => {
    this.addLineClass(line, 'wrap', codeMirrorActivelineClassName);
  });

  return lines;
});

CodeMirror.defineDocExtension('unhighlightLines', function (sequenceString, firstLineNumber) {
  const lines = getLinesFronSequenceString(sequenceString, firstLineNumber);

  lines.forEach((line) => {
    this.removeLineClass(line, 'wrap', codeMirrorActivelineClassName);
  });

  return lines;
});
