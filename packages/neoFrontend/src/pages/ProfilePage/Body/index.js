import React, { useEffect, useContext, useCallback } from 'react';
import { useSearchState } from '../../../useSearchQuery';
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

const isPublic = (section) => section === 'public' || section === '';

export const Body = () => {
  const { me } = useContext(AuthContext);
  const {
    user,
    section,
    visualizationInfos: initialVisualizationInfos,
  } = useContext(ProfilePageDataContext);
  const {
    visualizationInfos,
    paginate,
    usersById,
    isFetchingNextPage,
  } = useProfileVizzes({ user, section, initialVisualizationInfos });

  const [, setSearch] = useSearchState();
  const handleSectionChange = useCallback(
    (newSection) => {
      setSearch({
        section: isPublic(newSection) ? undefined : newSection,
      });
    },
    [setSearch]
  );

  useEffect(() => {
    sendEvent(`event.pageview.profile.user:${user.id}`);
  }, [user]);

  const showPublic = useCallback(() => {
    handleSectionChange('public');
  }, [handleSectionChange]);

  const showPrivate = useCallback(() => {
    handleSectionChange('private');
  }, [handleSectionChange]);

  const showVizzesSharedWithMe = useCallback(() => {
    handleSectionChange('shared');
  }, [handleSectionChange]);

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
            active={isPublic(section)}
            icon="LockOpenSVG"
            onClick={showPublic}
          >
            Public
          </LinkWithIcon>
          {showProfileSidebar(user, me) ? (
            <LinkWithIcon
              active={section === 'private'}
              icon="LockSVG"
              onClick={showPrivate}
            >
              Private
            </LinkWithIcon>
          ) : null}
          {Boolean(me) && user.id === me.id && (
            <LinkWithIcon
              active={section === 'shared'}
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
