import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingScreen } from '../../LoadingScreen';
import { Feedback } from '../../Feedback';
import { NavBar } from '../../NavBar';
import { Wrapper } from '../styles';
import { ProfilePageDataProvider } from './ProfilePageDataContext';
import { Body } from './Body';

export const ProfilePage = () => {
  const { userName } = useParams();

  const searchProps = useMemo(() => ({ redirectPath: `/${userName}` }), [userName]);

  return(
    <>
      <NavBar showSearch searchProps={searchProps} />
      <Wrapper>
        <ProfilePageDataProvider fallback={<LoadingScreen />}>
          <Body />
        </ProfilePageDataProvider>
      </Wrapper>
      <Feedback />
    </>
  );
};
