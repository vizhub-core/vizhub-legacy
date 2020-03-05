import React from 'react';
import { SubSectionDescription, Spacer } from '../../styles';
import { Input } from '../../../../Input';
import { FormRow } from '../../styles';

export const CollaboratorsBody = () => (
  <>
    <SubSectionDescription>
      Start typing to search available collaborators for this visualization.
    </SubSectionDescription>
    <Spacer height={22} />
    <FormRow>
      <Input size="grow" />
    </FormRow>
  </>
);
