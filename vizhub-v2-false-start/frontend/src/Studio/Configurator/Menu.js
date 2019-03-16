import React, { useState } from 'react';
import { Foldable } from './Foldable';
import { Item, ItemIcon } from './styles';
import { RadioButtonSVG } from '../../icons';

export const Menu = ({ title, options, activeOption, setActiveOption }) => {
  const [isActive, setIsActive] = useState(false);
  const toggle = () => setIsActive(!isActive);

  return (
    <Foldable isActive={isActive} title={title} onClick={toggle}>
      {options.map(({ title, id }) => (
        <Item key={id} onClick={() => setActiveOption(id)}>
          <ItemIcon>
            <RadioButtonSVG checked={id === activeOption} />
          </ItemIcon>
          {title}
        </Item>
      ))}
    </Foldable>
  );
};
