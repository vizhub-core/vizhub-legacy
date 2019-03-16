import React, { useState } from 'react';
import { Foldable } from './Foldable';

export const Menu = ({ title, options }) => {
  const [isActive, setIsActive] = useState(false);
  const toggle = () => setIsActive(!isActive);

  return (
    <Foldable isActive={isActive} title={title} onClick={toggle}>
      {options.map(({ title, id }) => (
        <div key={id}>{title}</div>
      ))}
    </Foldable>
  );
};
