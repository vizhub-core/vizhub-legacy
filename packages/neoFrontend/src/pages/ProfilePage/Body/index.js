import React, { useState, useContext, useMemo, useCallback } from 'react';
import { isVizInfoPrivate } from 'vizhub-presenters';

import { ProfilePageDataContext } from '../ProfilePageDataContext';
import { AuthContext } from '../../../authentication';
import { NavBar } from '../../../NavBar';
import { Wrapper, Content, Centering } from '../../styles';
import { SidebarWrapper, Main, Sidebar } from '../styles';
import { LinkWithIcon } from '../../VizPage/LinkWithIcon';
import { showProfileSidebar } from '../../../featureFlags';

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
  const { me } = useContext(AuthContext);

  const [privacy, setPrivacy] = useState('public');

  const visualizations = useMemo(
    () =>
      visualizationInfos.filter((d) =>
        privacy === 'private' ? isVizInfoPrivate(d) : !isVizInfoPrivate(d)
      ),
    [visualizationInfos, privacy]
  );

  const showPublic = useCallback(() => {
    setPrivacy('public');
  }, []);

  const showPrivate = useCallback(() => {
    setPrivacy('private');
  }, []);

  const vizzesUsersMap = useMemo(() => ({ [user.id]: user }), [user]);

  const searchProps = useMemo(() => ({ redirectPath: `/${user.userName}` }), [
    user.userName,
  ]);

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
            {showProfileSidebar(user, me) ? (
              <Sidebar>
                <LinkWithIcon
                  active={privacy !== 'private'}
                  icon="PeopleSVG"
                  onClick={showPublic}
                >
                  Public
                </LinkWithIcon>
                <LinkWithIcon
                  active={privacy === 'private'}
                  icon="LockSVG"
                  onClick={showPrivate}
                >
                  Private
                </LinkWithIcon>
              </Sidebar>
            ) : null}
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
