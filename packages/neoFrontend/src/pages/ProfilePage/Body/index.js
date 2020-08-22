import React, { useState, useContext, useMemo, useCallback } from 'react';
import { isVizInfoPrivate } from 'vizhub-presenters';
import { VIZ_INFO_SORT_OPTION_MOST_RECENT } from 'vizhub-entities';

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
import { ProfilePageDataContext } from '../ProfilePageDataContext';
import { ProfilePane } from '../ProfilePane';
import { ProfileMenuBar } from './styles';

export const Body = () => {
  const profilePageData = useContext(ProfilePageDataContext);
  const {
    user,
    visualizationInfos,
    paginate,
    usersById,
    isFetchingNextPage,
  } = profilePageData;

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

  const [sort, handleSortChange] = useVizzesSort(
    VIZ_INFO_SORT_OPTION_MOST_RECENT.id
  );

  return (
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
