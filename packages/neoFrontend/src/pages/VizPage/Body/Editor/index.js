import React from 'react';
import { Wrapper } from './styles';
import { Section } from './Section';
import { FilesSection } from './FilesSection';

export const Editor = () => {
  return (
    <Wrapper>
      <Section title="visual editor" id="visual" />
      <FilesSection />
    </Wrapper>
  );
};
