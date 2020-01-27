import React, { useContext } from 'react';
import { Vizzes as VizzesPresentation } from '../../VizzesGrid/Vizzes';
import { HomePageDataContext } from './HomePageDataContext';

export const Vizzes = () => (
  <VizzesPresentation {...useContext(HomePageDataContext)} />
);
