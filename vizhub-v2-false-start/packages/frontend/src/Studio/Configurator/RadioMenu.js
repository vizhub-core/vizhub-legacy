import React from 'react';
import { RadioButtonSVG } from '../../svg';
import { Item, ItemIcon } from './styles';
import { Menu } from './Menu';

export const RadioMenu = ({
  title,
  options,
  activeOption,
  setActiveOption
}) => (
  <Menu title={title}>
    {options.map(option => {
      // Options can be strings or objects with { title, id }.
      const title = option.title || option;
      const id = option.id || option;

      return (
        <Item key={id} onClick={() => setActiveOption(id)}>
          <ItemIcon>
            <RadioButtonSVG checked={id === activeOption} />
          </ItemIcon>
          {title}
        </Item>
      );
    })}
  </Menu>
);
