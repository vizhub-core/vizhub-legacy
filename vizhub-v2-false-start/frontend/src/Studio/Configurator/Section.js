import React, { useContext } from 'react';
import { URLStateContext } from '../../urlState';
import { Foldable } from './Foldable';

export const Section = ({ id, title, children }) => {
  const { activeSection, setActiveSection } = useContext(URLStateContext);
  const isActive = id === activeSection;

  return (
    <Foldable
      onClick={() => setActiveSection(isActive ? null : id)}
      isActive={isActive}
      title={title}
      children={children}
    />
  );
};
