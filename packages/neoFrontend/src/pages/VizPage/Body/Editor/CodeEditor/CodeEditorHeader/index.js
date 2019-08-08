import React from 'react';
import { Wrapper, Icons, CodeEditorIcon } from './styles';
import { FullSVG, CloseSVG } from '../../../../../../svg';
import { isMobile } from '../../../../../../mobileMods';

const svgHeight = 15;

export const CodeEditorHeader = ({
  activeFile,
  viewer,
  onShowViz,
  onHideViz,
  closeActiveFile
}) => (
  <Wrapper>
    <div className="test-code-editor-file-name">{activeFile}</div>
    <Icons>
      {viewer ? (
        <>
          <CodeEditorIcon
            onClick={onHideViz}
            leftmost={true}
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
