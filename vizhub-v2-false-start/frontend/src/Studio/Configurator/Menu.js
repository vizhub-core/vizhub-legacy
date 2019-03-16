import React, { useState } from 'react';
import { Foldable } from './Foldable';
import { Item } from './styles';

export const Menu = ({ title, options, activeOption, setActiveOption }) => {
  const [isActive, setIsActive] = useState(false);
  const toggle = () => setIsActive(!isActive);

  return (
    <Foldable isActive={isActive} title={title} onClick={toggle}>
      {options.map(({ title, id }) => (
        <Item
          key={id}
          isActive={id === activeOption}
          onClick={() => setActiveOption(id)}
        >
          {title}
        </Item>
      ))}
    </Foldable>
  );
};
