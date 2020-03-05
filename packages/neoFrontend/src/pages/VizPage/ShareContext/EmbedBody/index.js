import React from 'react';
import { SubSectionDescription } from '../../styles';
import { TextCopier } from '../TextCopier';

export const EmbedBody = () => {
  const html = '<iframe></iframe>';

  return (
    <>
      <SubSectionDescription>Embed Preview Image</SubSectionDescription>
      <SubSectionDescription>Embed Settings</SubSectionDescription>
      <TextCopier text={html} />
    </>
  );
};
