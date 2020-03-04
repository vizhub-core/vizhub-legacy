import React from 'react';

import { SectionDescription } from '../../styles';
import { Button } from '../../../styles';
import { Input } from '../../../../Input';
import { FormRow } from '../../styles';

export const LinkBody = () => (
  <SectionDescription>
    <FormRow>
      Sharing this link on social media will automatically create a preview.
    </FormRow>
    <FormRow>
      <Input value={window.location.href} size="grow" autoSelect />
      <Button>Copy</Button>
    </FormRow>
  </SectionDescription>
);
