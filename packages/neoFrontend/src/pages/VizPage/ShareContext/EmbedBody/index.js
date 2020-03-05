import copy from 'copy-to-clipboard';
import React, {useCallback} from 'react';
import { Button } from '../../../styles';
import { Input } from '../../../../Input';
import { SubSectionDescription, FormRow } from '../../styles';

export const EmbedBody = () => {
  const html = '<iframe></iframe>';

  const handleClick = useCallback(() => {
    copy(html);
  }, [html]);

  return (
    <>
      <SubSectionDescription>Embed Preview Image</SubSectionDescription>
      <SubSectionDescription>Embed Settings</SubSectionDescription>
      <FormRow>
        <Input value={html} size="grow" autoSelect />
        <Button onClick={handleClick}>Copy</Button>
      </FormRow>
    </>
  );
};
