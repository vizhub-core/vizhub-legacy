import React, { useCallback, useState } from 'react';
import copy from 'copy-to-clipboard';
import { Button } from '../../../Button';
import { Input } from '../../../Input';
import { FormRow } from '../styles';

export const TextCopier = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(() => {
    copy(text);
    setCopied(true);
  }, [text]);

  return (
    <FormRow>
      <Input value={text} size="grow" autoSelect />
      <Button onClick={handleClick}>{copied ? 'Copied!' : 'Copy'}</Button>
    </FormRow>
  );
};
