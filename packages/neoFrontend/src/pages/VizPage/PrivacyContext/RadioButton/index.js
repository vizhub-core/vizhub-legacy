import React, { createContext, useContext, useCallback } from 'react';
import { RadioButtonSVG } from '../../../../svg';

const RadioButtonsContext = createContext();

export const RadioButtons = ({ children, onChange, value }) => {
  return (
    <RadioButtonsContext.Provider value={{ onChange, value }}>
      {children}
    </RadioButtonsContext.Provider>
  );
};

export const RadioButton = () => {
  const { onChange, value } = useContext(RadioButtonsContext);
  const onClick = useCallback(() => {
    onChange(value);
  }, [onChange, value]);
  return <RadioButtonSVG onClick={onClick} />;
};
