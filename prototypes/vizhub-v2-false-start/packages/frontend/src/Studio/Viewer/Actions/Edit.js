import React, { useContext } from 'react';
import { URLStateContext } from '../../../contexts';
import { EditSVG } from '../../../svg';
import { Action } from './Action';

export const Edit = ({ onClick }) => {
  const { toggleConfigurator } = useContext(URLStateContext);
  return (
    <Action svg={EditSVG} onClick={toggleConfigurator}>
      Edit
    </Action>
  );
};
