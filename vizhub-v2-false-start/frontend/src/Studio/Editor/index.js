import React from 'react';
import { CodeMirror } from './CodeMirror';
import { sampleCode } from './sampleCode';

export const Editor = () => <CodeMirror initialDoc={sampleCode} />;
