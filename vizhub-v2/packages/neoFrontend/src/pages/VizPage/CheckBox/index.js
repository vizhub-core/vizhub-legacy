import React from 'react';
import { RadioButtonSVG } from '../../../svg';
import { Wrapper, Label } from '../RadioButton/styles';

export const CheckBox = ({ label, onClick, isActive }) => {
  return (
    <Wrapper onClick={onClick}>
      <RadioButtonSVG isActive={isActive} />
      <Label>{label}</Label>
    </Wrapper>
  );
};
