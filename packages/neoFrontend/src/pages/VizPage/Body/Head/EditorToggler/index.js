import React, { useContext } from 'react';
import { ArrowSVG } from '../../../../../svg';
import { URLStateContext } from '../../../URLStateContext';
import { modToggleEditor } from '../../../mobileMods';
import { Wrapper, Text } from './styles';

export const EditorToggler = () => {
  const { showEditor, toggleEditor, closeActiveFile } = useContext(
    URLStateContext
  );
  return (
    <Wrapper onClick={modToggleEditor(toggleEditor, closeActiveFile)}>
      <ArrowSVG left={showEditor} />
      <Text>{showEditor ? 'Close Editor' : 'Open Editor'}</Text>
    </Wrapper>
  );
};
