import React, { useState, useEffect } from 'react';
import { SubSectionDescription, Spacer } from '../../styles';
import { Input } from '../../../../Input';
import { FormRow } from '../../styles';

const debounceTimeMS = 500;
export const CollaboratorsBody = () => {
  const [typedText, setTypedText] = useState('');
  useEffect(() => {
    console.log('here');
    const timeout = setTimeout(() => {
      console.log('Fetch data for ' + typedText);
    }, debounceTimeMS);
    return () => clearTimeout(timeout);
  }, [typedText]);
  console.log(typedText);
  return (
    <>
      <SubSectionDescription>
        Start typing to search available collaborators for this visualization.
      </SubSectionDescription>
      <Spacer height={22} />
      <FormRow>
        <Input value={typedText} onChange={setTypedText} size="grow" />
      </FormRow>
    </>
  );
};
