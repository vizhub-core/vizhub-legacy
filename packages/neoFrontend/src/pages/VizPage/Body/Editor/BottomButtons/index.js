import React, { useState } from 'react';
import { Wrapper, BottomButton } from './styles';
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
        <SettingsSVG />
      </BottomButton>
      <BottomButton>
        <SettingsSVG />
      </BottomButton>
      <BottomButton>
        <SettingsSVG />
      </BottomButton>
      <BottomButton
        onClick={onDeleteClick}
        isActive={activeButton === DELETE_BUTTON}
      >
        D
      </BottomButton>
    </Wrapper>
  );
};
