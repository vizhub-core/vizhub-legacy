import React from 'react';
import { Wrapper } from './styles';
import { Section } from './Section';

export const Editor = () => (
  <Wrapper>
    <Section title="visual editor" id="visual" />
    <Section title="files" id="files" />
  </Wrapper>
);
