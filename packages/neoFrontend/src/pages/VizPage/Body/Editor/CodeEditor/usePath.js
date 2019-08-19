import { useMemo } from 'react';

export const getPath = (fileIndex, field) => ['files', fileIndex, field];

export const usePath = (fileIndex, field = 'text') =>
  useMemo(() => getPath(fileIndex, field), [fileIndex, field]);
