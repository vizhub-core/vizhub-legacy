import React, { useCallback } from 'react';
import { CheckBox } from '../../CheckBox';

export const AnyoneCanEdit = () => {
  const onClick = useCallback(() => {
    console.log('here');
  }, []);

  return <CheckBox label="Anyone can edit." onClick={onClick} />;
};
