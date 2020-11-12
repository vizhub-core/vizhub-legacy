import React, { useState, useRef, useEffect, useMemo } from 'react';
import { getExtension } from 'vizhub-presenters';
import { lintJs } from '../../../../../../../featureFlags';
import { convertToNumberSequence } from '../../../../../../../utils/number';
import { Wrapper } from './styles';
import { CodeMirrorGlobalStyle } from './CodeMirrorGlobalStyle';
import { linkOverlay } from './overlays';


const modes = {
  '.html': 'htmlmixed',
  '.css': 'css',
  '.js': 'jsx',
  '.md': 'markdown',
};
const getMode = (extension) => modes[extension];

// Disable wrapping for JS code.
// Enable wrapping for everything else.
const getLineWrapping = (extension) => extension !== '.js';

export const CodeMirrorReactBinding = React.forwardRef(({
  fileText,
  fileName,
  firstLineNumber = 1,
  selectedLines,
  readonly,
  keyMap,
  editorModules,
  onGutterClick,
  onLinkClick,
  onManualRun,
  onFileTextChange,
  onCursorActivity,
  onCursorPositionChange,
  onToggleVimMode
}, ref) => {
  const wrapperRef = useRef();
  const [codeMirror, setCodeMirror] = useState();

  // Compute extension of active file (e.g. '.js', '.md').
  const extension = useMemo(() => getExtension(fileName), [fileName]);

  // Alt+V to toggle Vim mode.
  useEffect(() => {
    if (!onToggleVimMode) return;

    const onKeyDown = (e) => {
      if (e.altKey && e.code === 'KeyV') {
        onToggleVimMode();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onToggleVimMode]);

  // Initialize codeMirror instance.
  useEffect(() => {
    if (!editorModules) return;

    if (codeMirror) return;

    // If the file does not exist at this point, it means that
    // we are accessing a URL that has a file "open" that doesn't exist,
    // either because it's been renamed or deleted.
    // In this case, we bail out to avoid a crash.
    if (!fileText) {
      return;
    }

    const { CodeMirror } = editorModules;
    const cm = new CodeMirror(wrapperRef.current, {
      value: fileText,
      mode: getMode(extension),
      lineNumbers: true,
      firstLineNumber,
      tabSize: 2,
      matchBrackets: true,
      closeOnBlur: false,
      extraKeys: {
        'Ctrl-Space': 'autocomplete',
        ...(onManualRun ? {'Shift-Enter': onManualRun} : {})
      },
      gutters: ['CodeMirror-lint-markers'],
      lint: lintJs,
    });

    cm.addOverlay(linkOverlay);

    setCodeMirror(cm);

    ref && ref(cm);
  }, [
    ref,
    wrapperRef,
    editorModules,
    codeMirror,
    fileText,
    extension,
    firstLineNumber,
    onManualRun,
  ]);

  // Update language mode and wrapping when extension changes.
  useEffect(() => {
    if (!codeMirror) return;
    codeMirror.setOption('mode', getMode(extension));
    codeMirror.setOption('lineWrapping', getLineWrapping(extension));

    codeMirror.performLint();
  }, [codeMirror, extension]);

  // Don't allow editing of bundle.js.
  useEffect(() => {
    if (!codeMirror) return;
    codeMirror.setOption('readOnly', readonly);
  }, [codeMirror, readonly]);

  // Update keyMap.
  useEffect(() => {
    if (!codeMirror || !keyMap) return;
    codeMirror.setOption('keyMap', keyMap);
  }, [codeMirror, keyMap]);

  // Ensure newly opened file has focus.
  useEffect(() => {
    if (!codeMirror) return;
    codeMirror.focus();
  }, [codeMirror, fileText]);

  // keep track of previous selected lines
  const prevSelectedLinesRef = useRef(null);

  // Respond to change of active line
  useEffect(() => {
    if (!codeMirror) return;

    const doc = codeMirror.getDoc();

    if (prevSelectedLinesRef.current) {
      doc.unhighlightLines(prevSelectedLinesRef.current, firstLineNumber);
    }

    if (selectedLines) {
      const [firstLine] = doc.highlightLines(selectedLines, firstLineNumber);
      const top = codeMirror.heightAtLine(firstLine, 'local');
      codeMirror.scrollTo(null, top);
    }

    prevSelectedLinesRef.current = selectedLines;
  }, [codeMirror, firstLineNumber, selectedLines]);

  // Respond to gutter click
  useEffect(() => {
    if (!codeMirror || !onGutterClick) return;

    const handler = (_, docLineNumber) => {
      // converting to line string pattern
      onGutterClick(convertToNumberSequence(docLineNumber + 1));
    };

    codeMirror.on('gutterClick', handler);
    return () => {
      codeMirror.off('gutterClick', handler);
    };
  }, [codeMirror, onGutterClick]);

  // Respond to link click
  useEffect(() => {
    if (!codeMirror || !onLinkClick) return;

    const handler = (_, event) => {
      if (event.ctrlKey && event.target.classList.contains('cm-link')) {
        event.preventDefault();
        event.stopPropagation();
        onLinkClick(event.target.textContent);
      }
    };

    codeMirror.on('mousedown', handler);
    return () => {
      codeMirror.off('mousedown', handler);
    };
  }, [codeMirror, onLinkClick]);

  // Respond to changes in text.
  // Submit ops for local user-generated changes.
  // Ignore other types of changes (remote op, initialization using setValue).
  useEffect(() => {
    if (!codeMirror || !onFileTextChange) return;

    const handler = (instance, changes) => {
      if(readonly) return;

      // Assumption: if the first change object is user generated,
      // then all other change objects in the same operation are as well.
      if (changes[0].origin !== 'op') {
        onFileTextChange(codeMirror.getValue());
      }
    };

    codeMirror.on('changes', handler);
    return () => {
      codeMirror.off('changes', handler);
    };
  }, [codeMirror, readonly, onFileTextChange]);


  // Reset run timer on cursor movement.
  //
  // Motivation: If the user is moving about in the code editor,
  // chances are they are going to make some edits,
  // and they don't want the run to happen soon,
  // so better reset the run timer on each cursor motion.
  useEffect(() => {
    if (!codeMirror || !onCursorActivity) return;
    codeMirror.on('cursorActivity', onCursorActivity);
    return () => {
      codeMirror.off('cursorActivity', onCursorActivity);
    };
  }, [codeMirror, onCursorActivity]);

  // Submit presence
  useEffect(() => {
    if (!codeMirror || !onCursorPositionChange) return;
    const handleCursorActivity = () => {
      const from = codeMirror.getCursor(true);
      const to = codeMirror.getCursor(false);

      const doc = codeMirror.getDoc();
      const fromIndex = doc.indexFromPos(from);
      const toIndex = doc.indexFromPos(to);

      const presenceObject = {
        index: fromIndex,
        length: toIndex - fromIndex,
      };

      onCursorPositionChange(presenceObject);
    };
    codeMirror.on('cursorActivity', handleCursorActivity);

    // Remove presence on blur.
    const handleBlur = () => {
      onCursorPositionChange(null);
    };
    codeMirror.on('blur', handleBlur);

    return () => {
      codeMirror.off('cursorActivity', handleCursorActivity);
      codeMirror.off('blur', handleBlur);
    };
  }, [codeMirror, onCursorPositionChange]);

  return (
    <>
      <CodeMirrorGlobalStyle />
      <Wrapper ref={wrapperRef} />
    </>
  );
});
