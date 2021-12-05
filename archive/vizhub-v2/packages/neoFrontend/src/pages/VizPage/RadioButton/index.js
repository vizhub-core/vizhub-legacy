import React, { createContext, useContext, useCallback } from 'react';
import { RadioButtonSVG } from '../../../svg';
import { Wrapper, GroupWrapper, Label } from './styles';

const RadioButtonsContext = createContext();

export const RadioButton = ({ value, className }) => {
  const { onChange, currentValue, vertical } = useContext(RadioButtonsContext);

  const onClick = useCallback(() => {
    onChange(value);
  }, [onChange, value]);

  const isActive = value === currentValue;

  return (
    <Wrapper
      onClick={onClick}
      className={className}
      data-test-is-active={isActive}
      vertical={vertical}
    >
      <RadioButtonSVG isActive={isActive} />
      <Label>{value}</Label>
    </Wrapper>
  );
};

const Group = ({ children, onChange, currentValue, vertical }) => (
  <GroupWrapper vertical={vertical}>
    <RadioButtonsContext.Provider value={{ onChange, currentValue, vertical }}>
      {children}
    </RadioButtonsContext.Provider>
  </GroupWrapper>
);
RadioButton.Group = Group;
