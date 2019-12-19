import React, { createContext, useContext, useCallback } from 'react';
import { RadioButtonSVG } from '../../../../svg';
import { Wrapper, Group, Label } from './styles';

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

RadioButton.Group = ({ children, onChange, currentValue }) => (
  <Group>
    <RadioButtonsContext.Provider value={{ onChange, currentValue }}>
      {children}
    </RadioButtonsContext.Provider>
  </Group>
);
