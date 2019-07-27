import React, { useContext } from 'react';
import { ArrowSVG } from '../../../../../svg';
import { URLStateContext } from '../../../URLStateContext';
import { Wrapper, Text } from './styles';

export const EditorToggler = () => {
  const { showEditor, toggleEditor } = useContext(URLStateContext);
  return (
    <Wrapper onClick={toggleEditor} className="test-toggle-editor">
      <ArrowSVG left={showEditor} />
      <Text>{showEditor ? 'Close Editor' : 'Open Editor'}</Text>
    </Wrapper>
  );
};
