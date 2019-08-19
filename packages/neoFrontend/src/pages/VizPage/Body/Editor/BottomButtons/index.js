import React, { useState, useContext, useCallback } from 'react';
import { withTheme } from 'styled-components';
import { SettingsSVG } from '../../../../../svg';
import { deleteFileOp } from '../../../../../accessors';
import { VizContext } from '../../../VizContext';
import { URLStateContext } from '../../../URLStateContext';
import {
  Wrapper,
  BottomButton,
  ClickableOverlay,
  Top,
  Bottom,
  TopList,
  TopListItem
} from './styles';
import { DeleteTop } from './DeleteTop';

const DELETE_BUTTON = 'delete';
const SETTINGS_BUTTON = 'settings';

export const BottomButtons = withTheme(({ theme, activeFile }) => {
  const [activeButton, setActiveButton] = useState(null);

  const { viz$, submitVizContentOp } = useContext(VizContext);
  const { closeActiveFile } = useContext(URLStateContext);

  const onDeleteClick = useCallback(() => {
    setActiveButton(activeButton === DELETE_BUTTON ? null : DELETE_BUTTON);
  }, [setActiveButton, activeButton]);

  const onSettingsClick = useCallback(() => {
    setActiveButton(activeButton === SETTINGS_BUTTON ? null : SETTINGS_BUTTON);
  }, [setActiveButton, activeButton]);

  const clearActiveButton = useCallback(() => {
    setActiveButton(null);
  }, [setActiveButton]);

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
          />
        ) : activeButton === SETTINGS_BUTTON ? (
          <TopList>
            <TopListItem>height</TopListItem>
            <TopListItem>anyone can edit</TopListItem>
          </TopList>
        ) : null}
      </Top>
      <Bottom>
        <BottomButton isActive={activeButton === SETTINGS_BUTTON}>
          <ClickableOverlay onClick={onSettingsClick}>
            <SettingsSVG />
          </ClickableOverlay>
        </BottomButton>
        <BottomButton>
          <ClickableOverlay>N</ClickableOverlay>
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
});
