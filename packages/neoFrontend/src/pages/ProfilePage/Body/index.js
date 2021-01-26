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
import { ProfilePageDataContext } from '../ProfilePageDataContext';
import { SidebarWrapper, Main, Sidebar } from '../styles';
import { LinkWithIcon } from '../LinkWithIcon';
import { ProfilePane } from '../ProfilePane';
import { useProfileVizzes } from './useProfileVizzes';
import { ProfileMenuBar } from './styles';

export const Body = () => {
  const { me } = useContext(AuthContext);
  const { user, visualizationInfos: initialVisualizationInfos } = useContext(ProfilePageDataContext);
  const [vizType, setVizType] = useState('public');
  const {
    visualizationInfos,
    paginate,
    usersById,
    isFetchingNextPage,
  } = useProfileVizzes({ me, vizType, initialVisualizationInfos });

  useEffect(() => {
    sendEvent(`event.pageview.profile.user:${user.id}`);
  }, [user]);

  const showPublic = useCallback(() => {
    setVizType('public');
  }, []);

  const showPrivate = useCallback(() => {
    setVizType('private');
  }, []);

  const showVizzesSharedWithMe = useCallback(() => {
    setVizType('shared');
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
            active={vizType === 'public'}
            icon="LockOpenSVG"
            onClick={showPublic}
          >
            Public
          </LinkWithIcon>
          {showProfileSidebar(user, me) ? (
            <LinkWithIcon
              active={vizType === 'private'}
              icon="LockSVG"
              onClick={showPrivate}
            >
              Private
            </LinkWithIcon>
          ) : null}
          {Boolean(me) && user.id === me.id && (
            <LinkWithIcon
              active={vizType === 'shared'}
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
