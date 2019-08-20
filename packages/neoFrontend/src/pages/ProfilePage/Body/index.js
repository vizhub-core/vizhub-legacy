import React, { useContext } from 'react';
import { ProfilePageDataContext } from '../ProfilePageDataContext';

export const Body = () => {
  const profilePageData = useContext(ProfilePageDataContext);
  return <pre>{JSON.stringify(profilePageData, null, 2)}</pre>;
};
