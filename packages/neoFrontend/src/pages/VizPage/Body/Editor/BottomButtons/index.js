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
  TopMessage,
  TopOptions,
  TopOption,
  TopList,
  TopListItem
} from './styles';

const DELETE_BUTTON = 'delete';
const SETTINGS_BUTTON = 'settings';

export const BottomButtons = withTheme(({ theme, activeFile }) => {
  const [activeButton, setActiveButton] = useState(null);

  const { viz$, submitVizContentOp } = useContext(VizContext);
  const { closeActiveFile } = useContext(URLStateContext);

  const onDeleteClick = useCallback(() => {
    setActiveButton(activeButton === DELETE_BUTTON ? null : DELETE_BUTTON);
  }, [setActiveButton, activeButton]);

  const clearActiveButton = useCallback(() => {
    setActiveButton(null);
  }, [setActiveButton]);

  const onDeleteConfirm = useCallback(() => {
    const op = deleteFileOp(viz$.getValue(), activeFile);
    closeActiveFile();
    clearActiveButton();
    submitVizContentOp(op);
  }, [activeFile, viz$, submitVizContentOp, closeActiveFile, clearActiveButton]);

  return (
    <Wrapper>
      {activeButton === DELETE_BUTTON ? (
        <Top>
          <TopMessage>Are you sure you want to delete this file?</TopMessage>
          <TopOptions>
            <TopOption>
              <ClickableOverlay onClick={clearActiveButton}>
                no
              </ClickableOverlay>
            </TopOption>
            <TopOption rightmost={true}>
              <ClickableOverlay
                color={theme.attentionGrabber}
                onClick={onDeleteConfirm}
              >
                yes
              </ClickableOverlay>
            </TopOption>
          </TopOptions>
        </Top>
      ) : activeButton === SETTINGS_BUTTON ? (
        <Top>
          <TopList>
            <TopListItem>height</TopListItem>
            <TopListItem>anyone can edit</TopListItem>
          </TopList>
        </Top>
      ) : null}
      <Bottom>
        <BottomButton isActive={activeButton === SETTINGS_BUTTON}>
          <ClickableOverlay>
            <SettingsSVG />
          </ClickableOverlay>
        </BottomButton>
        <BottomButton>
          <ClickableOverlay>
            <SettingsSVG />
          </ClickableOverlay>
        </BottomButton>
        <BottomButton>
          <ClickableOverlay>
            <SettingsSVG />
          </ClickableOverlay>
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
