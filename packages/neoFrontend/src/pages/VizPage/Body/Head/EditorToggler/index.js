import React, { useContext } from 'react';
import { ArrowLeftSVG, ArrowRightSVG } from '../../../../../svg';
import { URLStateContext } from '../../../URLStateContext';
import { Wrapper, Text } from './styles';

export const EditorToggler = () => {
  const { showEditor, toggleEditor } = useContext(URLStateContext);
  return (
    <Wrapper onClick={toggleEditor}>
      {showEditor ? <ArrowLeftSVG /> : <ArrowRightSVG />}
      <Text>{showEditor ? 'Close Editor' : 'Open Editor'}</Text>
    </Wrapper>
  );
};
