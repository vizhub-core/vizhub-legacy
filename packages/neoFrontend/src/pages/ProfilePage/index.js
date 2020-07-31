import React from 'react';
import { LoadingScreen } from '../../LoadingScreen';
import { Feedback } from '../../Feedback';
import { ProfilePageDataProvider } from './ProfilePageDataContext';
import { Body } from './Body';

export const ProfilePage = () => (
  <ProfilePageDataProvider fallback={<LoadingScreen />}>
    <Body />
    <Feedback />
  </ProfilePageDataProvider>
);
