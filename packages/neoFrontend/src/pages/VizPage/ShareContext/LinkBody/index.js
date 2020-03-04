import React from 'react';
import { SectionDescription } from '../../styles';
import { Button } from '../../../styles';
import { Input } from '../../../../Input';
import { FormRow } from '../../styles';

export const LinkBody = () => {
  const url = 'something';
  return (
    <SectionDescription>
      <FormRow>
      Sharing this link on social media will automatically create a preview.
      </FormRow>
      <FormRow>
        <Input value={url} size="grow" />
        <Button>Copy</Button>
      </FormRow>
    </SectionDescription>
  );
};
