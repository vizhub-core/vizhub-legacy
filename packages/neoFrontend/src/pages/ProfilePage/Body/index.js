import React, { useContext, useMemo } from 'react';
import { ProfilePageDataContext } from '../ProfilePageDataContext';
import { ProfilePane } from '../ProfilePane';
import { NavBar } from '../../../NavBar';
import { Vizzes } from '../../../VizzesGrid/Vizzes';
import { Wrapper, Content } from '../../styles';

export const Body = () => {
  const profilePageData = useContext(ProfilePageDataContext);
  const { user, visualizationInfos } = profilePageData;

  const vizzesUsersMap = useMemo(() => {
    return { [user.id]: user };
  }, [user]);

  return (
    <Wrapper>
      <Content>
        <NavBar />
        <ProfilePane user={user} />
        <Vizzes
          className="test-profile-page-viz-previews"
          visualizationInfos={visualizationInfos}
          usersById={vizzesUsersMap}
        />
      </Content>
    </Wrapper>
  );
};
