import React, { createContext, useContext, useCallback } from 'react';
import { RadioButtonSVG } from '../../../../svg';
import { Wrapper, Group, Label } from './styles';

const RadioButtonsContext = createContext();

export const RadioButton = ({ value }) => {
  const { onChange, currentValue } = useContext(RadioButtonsContext);
  const onClick = useCallback(() => {
    onChange(value);
  }, [onChange, value]);
  return (
    <Wrapper>
      <RadioButtonSVG onClick={onClick} isActive={value === currentValue} />
      <Label>{value}</Label>
    </Wrapper>
  );
};

RadioButton.Group = ({ children, onChange, currentValue }) => (
  <Group>
    <RadioButtonsContext.Provider value={{ onChange, currentValue }}>
      {children}
    </RadioButtonsContext.Provider>
  </Group>
);