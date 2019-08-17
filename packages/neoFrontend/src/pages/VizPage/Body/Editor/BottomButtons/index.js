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
  TopOption
} from './styles';

const DELETE_BUTTON = 'delete';

export const BottomButtons = withTheme(({ theme, activeFile }) => {
  const [activeButton, setActiveButton] = useState(null);

  const { viz$, submitVizContentOp } = useContext(VizContext);
  const { closeActiveFile } = useContext(URLStateContext);

  const onDeleteConfirm = useCallback(() => {
    const op = deleteFileOp(viz$.getValue(), activeFile);
    closeActiveFile();
    submitVizContentOp(op);
  }, [activeFile, viz$, submitVizContentOp, closeActiveFile]);

  const onDeleteClick = useCallback(() => {
    setActiveButton(activeButton === DELETE_BUTTON ? null : DELETE_BUTTON);
  }, [setActiveButton, activeButton]);

  return (
    <Wrapper>
      {activeButton === DELETE_BUTTON ? (
        <Top>
          <TopMessage>Are you sure you want to delete this file?</TopMessage>
          <TopOptions>
            <TopOption>
              <ClickableOverlay>no</ClickableOverlay>
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
      ) : null}
      <Bottom>
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
        <BottomButton>
          <ClickableOverlay>
            <SettingsSVG />
          </ClickableOverlay>
        </BottomButton>
        <BottomButton
          isActive={activeButton === DELETE_BUTTON}
          activeColor={theme.attentionGrabber}
        >
          <ClickableOverlay onClick={onDeleteClick}>D</ClickableOverlay>
        </BottomButton>
      </Bottom>
    </Wrapper>
  );
});
