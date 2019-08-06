import { useMemo } from 'react';

export const usePath = fileIndex =>
  useMemo(() => ['files', fileIndex, 'text'], [fileIndex]);
