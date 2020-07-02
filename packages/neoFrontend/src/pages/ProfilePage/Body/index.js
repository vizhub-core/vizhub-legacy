import React, { useContext, useMemo } from 'react';
import { ProfilePageDataContext } from '../ProfilePageDataContext';
import { ProfilePane } from '../ProfilePane';
import { NavBar } from '../../../NavBar';
import { Vizzes } from '../../../VizzesGrid/Vizzes';
import { Wrapper, Content, Centering } from '../../styles';

export const Body = () => {
  const profilePageData = useContext(ProfilePageDataContext);
  const { user, visualizationInfos } = profilePageData;

  const vizzesUsersMap = useMemo(() => {
    return { [user.id]: user };
  }, [user]);

  const searchProps = useMemo(() => {
    return {redirectPath: `/${user.userName}`};
  }, [user.userName]);

  return (
    <Wrapper>
      <Content>
        <NavBar showSearch searchProps={searchProps}/>
        <ProfilePane user={user} />
        <Centering>
          <Vizzes
            className="test-profile-page-viz-previews"
            visualizationInfos={visualizationInfos}
            usersById={vizzesUsersMap}
          />
        </Centering>
      </Content>
    </Wrapper>
  );
};
