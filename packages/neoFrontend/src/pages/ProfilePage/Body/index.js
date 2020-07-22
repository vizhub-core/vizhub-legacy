import React, { useContext, useMemo } from 'react';
import { showSortOptions } from '../../../featureFlags';
import { NavBar } from '../../../NavBar';
import { Vizzes } from '../../../VizzesGrid/Vizzes';
import {
  VizzesSortForm,
  useVizzesSort,
} from '../../../VizzesGrid/VizzesSortForm';

import { ProfilePane } from '../ProfilePane';
import { ProfilePageDataContext } from '../ProfilePageDataContext';
import { Wrapper, Content, Centering, SpaceBetween } from '../../styles';

export const Body = () => {
  const profilePageData = useContext(ProfilePageDataContext);
  const { user, visualizationInfos } = profilePageData;

  const vizzesUsersMap = useMemo(() => {
    return { [user.id]: user };
  }, [user]);

  const searchProps = useMemo(() => {
    return { redirectPath: `/${user.userName}` };
  }, [user.userName]);

  const [sort, handleSortChange] = useVizzesSort();

  return (
    <>
      <NavBar showSearch searchProps={searchProps} />
      <Wrapper>
        <Content>
          <SpaceBetween>
            <ProfilePane user={user} />
            {showSortOptions ? (
              <VizzesSortForm value={sort} onChange={handleSortChange} />
            ) : null}
          </SpaceBetween>
          <Centering>
            <Vizzes
              className="test-profile-page-viz-previews"
              visualizationInfos={visualizationInfos}
              usersById={vizzesUsersMap}
            />
          </Centering>
        </Content>
      </Wrapper>
    </>
  );
};
