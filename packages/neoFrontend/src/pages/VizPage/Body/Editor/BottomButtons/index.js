import React, { useState } from 'react';
import { Wrapper, BottomButton, ClickableOverlay } from './styles';
import { SettingsSVG } from '../../../../../svg';

const DELETE_BUTTON = 'delete';

export const BottomButtons = () => {
  const [activeButton, setActiveButton] = useState(null);
  const onDeleteClick = () => {
    setActiveButton(activeButton === DELETE_BUTTON ? null : DELETE_BUTTON);
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
      <BottomButton isActive={activeButton === DELETE_BUTTON}>
        <ClickableOverlay onClick={onDeleteClick}>D</ClickableOverlay>
      </BottomButton>
    </Wrapper>
  );
};
