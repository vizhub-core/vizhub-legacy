import React, { useContext } from 'react';
import { Vizzes as VizzesPresentation } from '../../VizzesGrid/Vizzes';
import { PageDataContext } from './PageDataContext';

export const Vizzes = () => (
  <VizzesPresentation {...useContext(PageDataContext)} />
);
