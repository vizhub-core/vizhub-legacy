import React, { useContext, useCallback } from 'react';
import { URLStateContext } from '../../../URLStateContext';
import { Wrapper, TitleEntry, ClickableOverlay } from './styles';

export const Section = ({ title, id, children }) => {
  const { activeSection, setActiveSection } = useContext(URLStateContext);

  const isActive = id === activeSection;

  const toggle = useCallback(() => {
    setActiveSection(isActive ? null : id);
  }, [setActiveSection, id, isActive]);

  return (
    <Wrapper isActive={isActive}>
      <TitleEntry isActive={isActive}>
        {title}
        <ClickableOverlay onClick={toggle} />
      </TitleEntry>
      {isActive ? children : null}
    </Wrapper>
  );
};
