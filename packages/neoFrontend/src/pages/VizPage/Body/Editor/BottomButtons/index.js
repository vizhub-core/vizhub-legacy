import React, { useState } from 'react';
import { Wrapper, BottomButton, ClickableOverlay } from './styles';
import { SettingsSVG } from '../../../../../svg';

const DELETE_BUTTON = 'delete';

export const BottomButtons = () => {
  const [activeButton, setActiveButton] = useState(null);
  const onDeleteClick = () => {
    setActiveButton(DELETE_BUTTON);
  };
  return (
    <Wrapper>
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
        onClick={onDeleteClick}
        isActive={activeButton === DELETE_BUTTON}
      >
        <ClickableOverlay>D</ClickableOverlay>
      </BottomButton>
    </Wrapper>
  );
};
