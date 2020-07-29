import React, { useState, useContext, useMemo } from 'react';
import { isVizInfoPrivate } from 'vizhub-presenters';

import { ProfilePageDataContext } from '../ProfilePageDataContext';
import { NavBar } from '../../../NavBar';
import { Wrapper, Content, Centering } from '../../styles';
import { SidebarWrapper, Main, Sidebar } from '../styles';
import { LinkWithIcon } from '../../VizPage/LinkWithIcon'

import { showSortOptions } from '../../../featureFlags';
import { Vizzes } from '../../../VizzesGrid/Vizzes';
import {
  VizzesSortForm,
  useVizzesSort,
} from '../../../VizzesGrid/VizzesSortForm';

import { ProfilePane } from '../ProfilePane';
import { ProfileMenuBar } from './styles';

export const Body = () => {
  const profilePageData = useContext(ProfilePageDataContext);
  const { user, visualizationInfos } = profilePageData;

  const [privacy, setPrivacy] = useState('public');

  const visualizations = useMemo(() => visualizationInfos.filter((d) => filterViz(privacy,d)), [visualizationInfos, privacy]);

  function filterViz(privacy, d) {
    return privacy === "private" ? isVizInfoPrivate(d) : !isVizInfoPrivate(d) ;
  }
  function showPublic() {
    setPrivacy("public")
  }
  function showPrivate() {
    setPrivacy("private")
  }

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
          <ProfileMenuBar>
            <ProfilePane user={user} />
            {showSortOptions ? (
              <VizzesSortForm value={sort} onChange={handleSortChange} />
            ) : null}
          </ProfileMenuBar>
          <SidebarWrapper>
            <Sidebar>
              <LinkWithIcon active={privacy !== "private"} icon="PeopleSVG" onClick={showPublic}>Public</LinkWithIcon>
              <LinkWithIcon active={privacy === "private"} icon="LockSVG" onClick={showPrivate}>Private</LinkWithIcon>
            </Sidebar>
            <Main>
              <Centering>
                <Vizzes
                  className="test-profile-page-viz-previews"
                  visualizationInfos={visualizations}
                  usersById={vizzesUsersMap}
                />
              </Centering>
            </Main>
          </SidebarWrapper>
        </Content>
      </Wrapper>
    </>
  );
};
