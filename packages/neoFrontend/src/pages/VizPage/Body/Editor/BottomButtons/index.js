import React, { useState, useContext, useCallback } from 'react';
import { withTheme } from 'styled-components';
import { SettingsSVG } from '../../../../../svg';
import { deleteFileOp } from '../../../../../accessors';
import { VizContext } from '../../../VizContext';
import { URLStateContext } from '../../../URLStateContext';
import { Wrapper, BottomButton, ClickableOverlay, Top, Bottom } from './styles';
import { DeleteTop } from './DeleteTop';
import { SettingsTop } from './SettingsTop';
import { NewTop } from './NewTop';

const SETTINGS_BUTTON = 'settings';
const NEW_BUTTON = 'new';
const DELETE_BUTTON = 'delete';

export const BottomButtons = withTheme(
  ({ theme, activeFile, onNewFileClick }) => {
    const [activeButton, setActiveButton] = useState(null);

    const { viz$, submitVizContentOp } = useContext(VizContext);
    const { closeActiveFile } = useContext(URLStateContext);

    const onDeleteClick = useCallback(() => {
      setActiveButton(activeButton === DELETE_BUTTON ? null : DELETE_BUTTON);
    }, [setActiveButton, activeButton]);

    const onSettingsClick = useCallback(() => {
      setActiveButton(
        activeButton === SETTINGS_BUTTON ? null : SETTINGS_BUTTON
      );
    }, [setActiveButton, activeButton]);

    const onNewClick = useCallback(() => {
      setActiveButton(activeButton === NEW_BUTTON ? null : NEW_BUTTON);
    }, [setActiveButton, activeButton]);

    const clearActiveButton = useCallback(() => {
      setActiveButton(null);
    }, [setActiveButton]);

    const onNewFileListItemClick = useCallback(() => {
      clearActiveButton();
      onNewFileClick();
    }, [clearActiveButton, onNewFileClick]);

    const onDeleteConfirm = useCallback(() => {
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

    return (
      <Wrapper>
        <Top>
          {activeButton === DELETE_BUTTON ? (
            <DeleteTop
              onNoClick={clearActiveButton}
              onDeleteConfirm={onDeleteConfirm}
              theme={theme}
              activeFile={activeFile}
            />
          ) : activeButton === SETTINGS_BUTTON ? (
            <SettingsTop />
          ) : activeButton === NEW_BUTTON ? (
            <NewTop onNewFileListItemClick={onNewFileListItemClick} />
          ) : null}
        </Top>
        <Bottom>
          <BottomButton isActive={activeButton === SETTINGS_BUTTON}>
            <ClickableOverlay onClick={onSettingsClick}>
              <SettingsSVG />
            </ClickableOverlay>
          </BottomButton>
          <BottomButton
            isActive={activeButton === NEW_BUTTON}
            activeColor={'#3866e9'}
          >
            <ClickableOverlay onClick={onNewClick}>N</ClickableOverlay>
          </BottomButton>
          <BottomButton>
            <ClickableOverlay>E</ClickableOverlay>
          </BottomButton>
          {activeFile ? (
            <BottomButton
              isActive={activeButton === DELETE_BUTTON}
              activeColor={theme.attentionGrabber}
            >
              <ClickableOverlay onClick={onDeleteClick}>D</ClickableOverlay>
            </BottomButton>
          ) : null}
        </Bottom>
      </Wrapper>
    );
  }
);
