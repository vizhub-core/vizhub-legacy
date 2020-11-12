import React from 'react';
import { Wrapper } from './styles';

const bundleJSInfo =
  'This file is generated automatically from "index.js".\n\nIt combines all modules imported by "index.js" into a single file. Each time any JavaScript changes, this file is regenerated. Editing this file manually does not make sense, so is not allowed by the editor.';

export const Header = ({ showEditor, activeFile, children }) => {
  const isBundle = activeFile === 'bundle.js';
  return (
    <Wrapper showEditor={showEditor}>
      <div
        className="test-code-editor-file-name"
        title={isBundle ? bundleJSInfo : undefined}
        style={{ opacity: isBundle ? 0.5 : 1 }}
      >
        {activeFile}
      </div>
      {children}
    </Wrapper>
  );
};
