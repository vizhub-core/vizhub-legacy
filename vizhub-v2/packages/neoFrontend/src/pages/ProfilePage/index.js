import React, { useMemo, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchQuery, useSearchState } from '../../useSearchQuery';
import { LoadingScreen } from '../../LoadingScreen';
import { ErrorContext } from '../../ErrorContext';
import { AuthContext } from '../../authentication';
import { NavBar } from '../../NavBar';
import { Wrapper } from '../styles';
import { ProfilePageDataProvider } from './ProfilePageDataContext';
import { Body } from './Body';

export const ProfilePage = () => {
  const { userName } = useParams();
  const { setError: setGlobalError } = useContext(ErrorContext);

  // Default to sort by most recent when the logged in user
  // is viewing their own profile.
  const { me } = useContext(AuthContext);
  const { sort } = useSearchQuery();
  const setSearch = useSearchState()[1];

  if (me && me.userName === userName && sort === undefined) {
    setSearch({ sort: 'mostRecent' });
  }

  const searchProps = useMemo(() => ({ redirectPath: `/${userName}` }), [
    userName,
  ]);

  return (
    <>
      <NavBar showSearch searchProps={searchProps} />
      <Wrapper>
        <ProfilePageDataProvider
          fallback={<LoadingScreen />}
          onError={setGlobalError}
        >
          <Body />
        </ProfilePageDataProvider>
      </Wrapper>
    </>
  );
};
