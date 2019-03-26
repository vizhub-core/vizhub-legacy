import React, { useState } from 'react';
import { Foldable } from './Foldable';

export const Menu = ({ title, children }) => {
  const [isActive, setIsActive] = useState(false);
  const toggle = () => setIsActive(!isActive);

  return (
    <Foldable isActive={isActive} title={title} onClick={toggle}>
      {children}
    </Foldable>
  );
};
