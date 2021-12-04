import React, { useContext } from 'react';
import { URLStateContext } from '../../contexts';
import { Foldable } from './Foldable';

export const Section = ({ id, title, children }) => {
  const { activeSection, setActiveSection } = useContext(URLStateContext);
  const isActive = id === activeSection;
  const toggle = () => setActiveSection(isActive ? null : id);

  return (
    <Foldable onClick={toggle} isActive={isActive} title={title}>
      {children}
    </Foldable>
  );
};
