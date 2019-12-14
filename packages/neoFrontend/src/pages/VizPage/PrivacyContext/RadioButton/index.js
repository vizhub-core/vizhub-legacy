import React, { createContext, useContext, useCallback } from 'react';
import { RadioButtonSVG } from '../../../../svg';
import { Wrapper } from './styles';

const RadioButtonsContext = createContext();

export const RadioButton = ({ value }) => {
  const { onChange, currentValue } = useContext(RadioButtonsContext);
  const onClick = useCallback(() => {
    onChange(value);
  }, [onChange, value]);
  return (
    <Wrapper>
      <RadioButtonSVG onClick={onClick} isActive={value === currentValue} />
      {value}
    </Wrapper>
  );
};

RadioButton.Group = ({ children, onChange, currentValue }) => (
  <RadioButtonsContext.Provider value={{ onChange, currentValue }}>
    {children}
  </RadioButtonsContext.Provider>
);
