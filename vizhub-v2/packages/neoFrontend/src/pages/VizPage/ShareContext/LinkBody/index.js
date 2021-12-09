import React from 'react';
import { SubSectionDescription } from '../../styles';
import { TextCopier } from '../TextCopier';

export const LinkBody = () => {
  const url = window.location.href;

  return (
    <>
      <SubSectionDescription>
        Sharing this link on social media will automatically create a preview.
      </SubSectionDescription>
      <TextCopier text={url} />
    </>
  );
};
