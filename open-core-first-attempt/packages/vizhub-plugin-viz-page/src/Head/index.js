import React from 'react';
import { EditorToggleButton } from './EditorToggleButton';
import { classed } from 'vizhub-core';

const Wrapper = classed('head');

export const Head = () => {
  return (
    <Wrapper>
      <EditorToggleButton />
    </Wrapper>
  );
};
