import React, { useState } from 'react';
import { Wrapper, BottomButton, ClickableOverlay, Top, Bottom } from './styles';
import { SettingsSVG } from '../../../../../svg';

const DELETE_BUTTON = 'delete';

export const BottomButtons = () => {
  const [activeButton, setActiveButton] = useState(null);
  const onDeleteClick = () => {
    setActiveButton(activeButton === DELETE_BUTTON ? null : DELETE_BUTTON);
  };
  return (
    <Wrapper>
      {activeButton === DELETE_BUTTON ? (
        <Top>Are you sure you want to delete this file?</Top>
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
          activeColor="#f0353d"
        >
          <ClickableOverlay onClick={onDeleteClick}>D</ClickableOverlay>
        </BottomButton>
      </Bottom>
    </Wrapper>
  );
};
