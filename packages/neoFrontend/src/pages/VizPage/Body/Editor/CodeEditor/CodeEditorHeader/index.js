import React, { useContext } from 'react';
import {
  FullSVG,
  CloseSVG,
  ArrowSVG,
  VimSVG,
  PrettierSVG,
} from '../../../../../../svg';
import {
  codeEditorHeaderCloseTooltip,
  codeEditorHeaderEnterFullEditorTooltip,
  codeEditorHeaderExitFullEditorTooltip,
} from '../../../../../../constants';
import { isMobile } from '../../../../../../mobileMods';
import { VimModeContext } from '../../../../VimModeContext';
import { PrettierContext } from '../../../../PrettierContext';
import { CodeEditorIcon } from '../styles';
import { Header } from './Header';
import { Icons } from './styles';

const svgHeight = 15;

export const CodeEditorHeader = ({
  showEditor,
  activeFile,
  viewer,
  onShowViz,
  onHideViz,
  closeActiveFile,
  showTop,
  toggleShowTop,
}) => {
  const { isVimMode, toggleVimMode } = useContext(VimModeContext);
  const { prettify } = useContext(PrettierContext);
  const isBundle = activeFile === 'bundle.js';
  return (
    <Header showEditor={showEditor} activeFile={activeFile}>
      <Icons>
        {!isBundle ? (
          <CodeEditorIcon
            onClick={prettify}
            leftmost={true}
            title="Auto-format code with Prettier\nKeyboard shortcut: Alt + p"
          >
            <PrettierSVG height={svgHeight} />
          </CodeEditorIcon>
        ) : null}
        {!isMobile ? (
          <>
            <CodeEditorIcon
              onClick={toggleVimMode}
              title={`Toggle Vim mode\n(currently ${isVimMode ? 'on' : 'off'})`}
              style={{ opacity: isVimMode ? 1 : 0.2 }}
            >
              <VimSVG height={20} />
            </CodeEditorIcon>
            <CodeEditorIcon
              onClick={toggleShowTop}
              title={showTop ? 'Hide top bar' : 'Show top bar'}
            >
              <ArrowSVG height={svgHeight} up={showTop} down={!showTop} />
            </CodeEditorIcon>
          </>
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
    </Header>
  );
};
