import React from 'react';
import { FullSVG, CloseSVG, ArrowSVG } from '../../../../../../svg';
import {
  codeEditorHeaderCloseTooltip,
  codeEditorHeaderEnterFullEditorTooltip,
  codeEditorHeaderExitFullEditorTooltip,
} from '../../../../../../constants';
import { isMobile } from '../../../../../../mobileMods';
import { CodeEditorIcon } from '../styles';
import { Wrapper, Icons } from './styles';

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
  showTop,
  toggleShowTop,
}) => (
  <Wrapper showEditor={showEditor}>
    <div
      className="test-code-editor-file-name"
      title={activeFile === 'bundle.js' ? bundleJSInfo : undefined}
      style={{ opacity: activeFile === 'bundle.js' ? 0.5 : 1 }}
    >
      {activeFile}
    </div>
    <Icons>
      {!isMobile ? (
        <CodeEditorIcon
          onClick={toggleShowTop}
          leftmost={true}
          title={showTop ? 'Hide top bar' : 'Show top bar'}
        >
          <ArrowSVG height={svgHeight} up={showTop} down={!showTop} />
        </CodeEditorIcon>
      ) : null}
      {viewer ? (
        <>
          <CodeEditorIcon
            onClick={onHideViz}
            className="test-enter-full-editor"
            title={codeEditorHeaderEnterFullEditorTooltip}
          >
            <FullSVG height={svgHeight} />
          </CodeEditorIcon>
          <CodeEditorIcon
            onClick={closeActiveFile}
            rightmost={true}
            className="test-close-code-editor"
            title={codeEditorHeaderCloseTooltip}
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
          title={codeEditorHeaderExitFullEditorTooltip}
        >
          <CloseSVG height={svgHeight} />
        </CodeEditorIcon>
      )}
    </Icons>
  </Wrapper>
);
