import React, { useState } from 'react';
import { SubSectionDescription } from '../../styles';
import { RadioButton } from '../../RadioButton';
import { TextCopier } from '../TextCopier';

const VIZ = 'Embed visualization';
const WHITELABEL = 'Embed white-label visualization';
const PREVIEW = 'Embed visualization preview';

export const EmbedBody = () => {
  const html = '<iframe></iframe>';
  const [embedType, setEmbedType] = useState(VIZ);

  return (
    <>
      <SubSectionDescription>Embed Preview Image</SubSectionDescription>
      <SubSectionDescription>Embed Settings</SubSectionDescription>
      <RadioButton.Group onChange={setEmbedType} currentValue={embedType}>
        <RadioButton value={VIZ} />
        <RadioButton value={WHITELABEL} />
        <RadioButton value={PREVIEW} />
      </RadioButton.Group>
      <TextCopier text={html} />
    </>
  );
};
