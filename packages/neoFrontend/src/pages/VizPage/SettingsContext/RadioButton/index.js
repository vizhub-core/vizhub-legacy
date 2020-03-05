import React, { createContext, useContext, useCallback } from 'react';
import { RadioButtonSVG } from '../../../../svg';
import { Wrapper, GroupWrapper, Label } from './styles';

const RadioButtonsContext = createContext();

export const RadioButton = ({ value, className }) => {
  const { onChange, currentValue } = useContext(RadioButtonsContext);

  const onClick = useCallback(() => {
    onChange(value);
  }, [onChange, value]);

  const isActive = value === currentValue;

  return (
    <Wrapper
      onClick={onClick}
      className={className}
      data-test-is-active={isActive}
    >
      <RadioButtonSVG isActive={isActive} />
      <Label>{value}</Label>
    </Wrapper>
  );
};

const Group = ({ children, onChange, currentValue }) => (
  <GroupWrapper>
    <RadioButtonsContext.Provider value={{ onChange, currentValue }}>
      {children}
    </RadioButtonsContext.Provider>
  </GroupWrapper>
);
RadioButton.Group = Group;
