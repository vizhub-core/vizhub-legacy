import CodeMirror from 'codemirror';
import { parseNumberSequenceString } from '../../../../utils/number';

const codeMirrorActivelineClassName = 'CodeMirror-activeline-background';

const getLinesFronSequenceString = (sequenceString) =>
  parseNumberSequenceString(sequenceString).map((line) => line - 1);

CodeMirror.defineDocExtension('highlightLines', function (sequenceString) {
  const lines = getLinesFronSequenceString(sequenceString);

  lines.forEach((line) => {
    this.addLineClass(line, 'wrap', codeMirrorActivelineClassName);
  });

  return lines;
});

CodeMirror.defineDocExtension('unhighlightLines', function (sequenceString) {
  getLinesFronSequenceString(sequenceString).forEach((line) => {
    this.removeLineClass(line, 'wrap', codeMirrorActivelineClassName);
  });
});
