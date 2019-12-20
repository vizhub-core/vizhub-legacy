import React from 'react';
import { FullSVG, CloseSVG, PrettierSVG } from '../../../../../../svg';
import { isMobile } from '../../../../../../mobileMods';
import { CodeEditorIcon } from '../styles';
import { Wrapper, Icons, Text } from './styles';

const svgHeight = 15;

const bundleJSInfo =
  'This file is generated automatically from "index.js".\n\nIt combines all modules imported by "index.js" into a single file. Each time any JavaScript changes, this file is regenerated. Editing this file manually does not make sense, so is not allowed by the editor.';

export const CodeEditorHeader = ({
  showEditor,
  activeFile,
  viewer,
  onShowViz,
  onHideViz,
  closeActiveFile,
  prettify
}) => (
  <Wrapper showEditor={showEditor}>
    <Text
      className="test-code-editor-file-name"
      title={activeFile === 'bundle.js' ? bundleJSInfo : undefined}
      style={{ opacity: activeFile === 'bundle.js' ? 0.5 : 1 }}
    >
      {activeFile}
    </Text>
    <Icons>
      {viewer ? (
        <>
          {activeFile !== 'bundle.js' ? (
            <CodeEditorIcon
              onClick={prettify}
              leftmost={true}
              title={`Auto-format code with Prettier
Keyboard shortcut: Alt + p`}
            >
              <PrettierSVG height={svgHeight} />
            </CodeEditorIcon>
          ) : null}
          <CodeEditorIcon
            onClick={onHideViz}
            className="test-enter-full-editor"
          >
            <FullSVG height={svgHeight} />
          </CodeEditorIcon>
          <CodeEditorIcon
            onClick={closeActiveFile}
            rightmost={true}
            className="test-close-code-editor"
          >
            <CloseSVG height={svgHeight} />
          </CodeEditorIcon>
        </>
      ) : isMobile ? (
        <CodeEditorIcon
          onClick={closeActiveFile}
          className="test-close-code-editor-mobile"
          rightmost={true}
          leftmost={true}
        >
          <CloseSVG height={svgHeight} />
        </CodeEditorIcon>
      ) : (
        <CodeEditorIcon
          onClick={onShowViz}
          leftmost={true}
          rightmost={true}
          className="test-exit-full-editor"
        >
          <CloseSVG height={svgHeight} />
        </CodeEditorIcon>
      )}
    </Icons>
  </Wrapper>
);