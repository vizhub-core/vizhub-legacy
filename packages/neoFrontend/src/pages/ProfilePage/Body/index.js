import React, { useState, useEffect, useContext, useCallback } from 'react';
import { sendEvent } from '../../../sendEvent';
import { AuthContext } from '../../../authentication';
import { showProfileSidebar } from '../../../featureFlags';
import { showSortOptions } from '../../../featureFlags';
import { Vizzes } from '../../../VizzesGrid/Vizzes';
import {
  VizzesSortForm,
  useVizzesSort,
} from '../../../VizzesGrid/VizzesSortForm';
import { Content, Centering } from '../../styles';
import { SidebarWrapper, Main, Sidebar } from '../styles';
import { LinkWithIcon } from '../LinkWithIcon';
import { ProfilePane } from '../ProfilePane';
import { useProfileData } from './useProfileData';
import { ProfileMenuBar } from './styles';

export const Body = () => {
  const { me } = useContext(AuthContext);
  const [typeOfVizzes, setTypeOfVizzes] = useState('public');
  const profilePageData = useProfileData(me, typeOfVizzes);
  const {
    user,
    visualizationInfos,
    paginate,
    usersById,
    isFetchingNextPage,
  } = profilePageData;

  useEffect(() => {
    sendEvent(`event.pageview.profile.user:${user.id}`);
  }, [user]);

  const showPublic = useCallback(() => {
    setTypeOfVizzes('public');
  }, []);

  const showPrivate = useCallback(() => {
    setTypeOfVizzes('private');
  }, []);

  const showVizzesSharedWithMe = useCallback(() => {
    setTypeOfVizzes('shared');
  }, []);

  const [sort, handleSortChange] = useVizzesSort();

  return (
    <Content>
      <ProfileMenuBar>
        <ProfilePane user={user} />
        {showSortOptions ? (
          <VizzesSortForm value={sort} onChange={handleSortChange} />
        ) : null}
      </ProfileMenuBar>
      <SidebarWrapper>
        <Sidebar>
          <LinkWithIcon
            active={typeOfVizzes === 'public'}
            icon="PeopleSVG"
            onClick={showPublic}
          >
            Public
          </LinkWithIcon>
          {showProfileSidebar(user, me) ? (
            <LinkWithIcon
              active={typeOfVizzes === 'private'}
              icon="LockSVG"
              onClick={showPrivate}
            >
              Private
            </LinkWithIcon>
          ) : null}
          {Boolean(me) && user.id === me.id && (
            <LinkWithIcon
              active={typeOfVizzes === 'shared'}
              icon="SharedWithMeSVG"
              onClick={showVizzesSharedWithMe}
            >
              Shared with me
            </LinkWithIcon>
          )}
        </Sidebar>
        <Main>
          <Centering>
            <Vizzes
              className="test-profile-page-viz-previews"
              visualizationInfos={visualizationInfos}
              paginate={paginate}
              usersById={usersById}
              isFetchingNextPage={isFetchingNextPage}
            />
          </Centering>
        </Main>
      </SidebarWrapper>
    </Content>
  );
};
