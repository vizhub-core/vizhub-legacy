import React, { useCallback } from 'react';
import copy from 'copy-to-clipboard';

import { SectionDescription } from '../../styles';
import { Button } from '../../../styles';
import { Input } from '../../../../Input';
import { FormRow } from '../../styles';

export const LinkBody = () => {
  const url = window.location.href;

  const handleClick = useCallback(() => {
    copy(url);
  }, [url]);

  return (
    <SectionDescription>
      <FormRow>
        Sharing this link on social media will automatically create a preview.
      </FormRow>
      <FormRow>
        <Input value={url} size="grow" autoSelect />
        <Button onClick={handleClick}>Copy</Button>
      </FormRow>
    </SectionDescription>
  );
};
