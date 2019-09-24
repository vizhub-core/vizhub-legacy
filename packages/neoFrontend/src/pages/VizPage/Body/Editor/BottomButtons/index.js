import React, { useState, useContext, useCallback } from 'react';
import { withTheme } from 'styled-components';
import { showEditorSettings } from '../../../../../featureFlags';
import { SettingsSVG, TrashSVG, NewSVG, ExportSVG } from '../../../../../svg';
import { deleteFileOp } from '../../../../../accessors';
import { VizContext } from '../../../VizContext';
import { URLStateContext } from '../../../URLStateContext';
import { Top } from './Top';
import { Wrapper, BottomButton, ClickableOverlay, Bottom } from './styles';
import {
  SETTINGS_BUTTON,
  NEW_BUTTON,
  EXPORT_BUTTON,
  DELETE_BUTTON
} from './constants';

export const BottomButtons = withTheme(
  ({ theme, activeFile, onNewFileClick }) => {
    const [activeButton, setActiveButton] = useState(null);

    const { viz$, submitVizContentOp } = useContext(VizContext);
    const { closeActiveFile, vizId } = useContext(URLStateContext);

    const onButtonClick = useCallback(
      buttonId => () => {
        setActiveButton(activeButton === buttonId ? null : buttonId);
      },
      [setActiveButton, activeButton]
    );

    const clearActiveButton = useCallback(() => {
      setActiveButton(null);
    }, [setActiveButton]);

    const onNewFileListItemClick = useCallback(() => {
      clearActiveButton();
      onNewFileClick();
    }, [clearActiveButton, onNewFileClick]);

    const onDeleteFileConfirm = useCallback(() => {
      const op = deleteFileOp(viz$.getValue(), activeFile);
      closeActiveFile();
      clearActiveButton();
      submitVizContentOp(op);
    }, [
      activeFile,
      viz$,
      submitVizContentOp,
      closeActiveFile,
      clearActiveButton
    ]);

    const onDeleteVizConfirm = useCallback(() => {
      console.log('TODO delete this viz');
    }, []);

    return (
      <Wrapper>
        <Top
          vizId={vizId}
          activeFile={activeFile}
          activeButton={activeButton}
          clearActiveButton={clearActiveButton}
          onNewFileListItemClick={onNewFileListItemClick}
          onDeleteFileConfirm={onDeleteFileConfirm}
          onDeleteVizConfirm={onDeleteVizConfirm}
        />
        <Bottom>
          {showEditorSettings ? (
            <BottomButton isActive={activeButton === SETTINGS_BUTTON}>
              <ClickableOverlay onClick={onButtonClick(SETTINGS_BUTTON)}>
                <SettingsSVG />
              </ClickableOverlay>
            </BottomButton>
          ) : null}
          <BottomButton
            isActive={activeButton === NEW_BUTTON}
            activeColor={'#3866e9'}
          >
            <ClickableOverlay onClick={onButtonClick(NEW_BUTTON)}>
              <NewSVG />
            </ClickableOverlay>
          </BottomButton>
          <BottomButton isActive={activeButton === EXPORT_BUTTON}>
            <ClickableOverlay onClick={onButtonClick(EXPORT_BUTTON)}>
              <ExportSVG />
            </ClickableOverlay>
          </BottomButton>
          {activeFile !== 'bundle.js' ? (
            <BottomButton
              isActive={activeButton === DELETE_BUTTON}
              activeColor={theme.attentionGrabber}
            >
              <ClickableOverlay onClick={onButtonClick(DELETE_BUTTON)}>
                <TrashSVG />
              </ClickableOverlay>
            </BottomButton>
          ) : null}
        </Bottom>
      </Wrapper>
    );
  }
);
