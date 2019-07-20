import React, { useContext, useCallback } from 'react';
import { URLStateContext } from '../../../URLStateContext';
import { Wrapper } from './styles';

export const Section = ({ title, id }) => {
  const { activeSection, setActiveSection } = useContext(URLStateContext);

  const isActive = id === activeSection;

  const toggle = useCallback(() => {
    setActiveSection(isActive ? null : id);
  }, [setActiveSection, id, isActive]);

  return (
    <Wrapper onClick={toggle} isActive={isActive}>
      {title}
    </Wrapper>
  );
};
