import React, { useState } from 'react';
import { withTheme } from 'styled-components';
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
import { SettingsSVG } from '../../../../../svg';

const DELETE_BUTTON = 'delete';

export const BottomButtons = withTheme(({ theme }) => {
  const [activeButton, setActiveButton] = useState(null);

  const onDeleteConfirm = () => {
    console.log('TODO actually delete');
  };

  const onDeleteClick = () => {
    setActiveButton(activeButton === DELETE_BUTTON ? null : DELETE_BUTTON);
  };

  return (
    <Wrapper>
      {activeButton === DELETE_BUTTON ? (
        <Top>
          <TopMessage>Are you sure you want to delete this file?</TopMessage>
          <TopOptions>
            <TopOption>
              <ClickableOverlay>No</ClickableOverlay>
            </TopOption>
            <TopOption rightmost={true}>
              <ClickableOverlay
                color={theme.attentionGrabber}
                onClick={onDeleteConfirm}
              >
                Yes
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
