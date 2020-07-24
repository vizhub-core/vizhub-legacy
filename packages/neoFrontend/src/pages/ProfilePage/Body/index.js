import React, { useState, useContext } from 'react';
import { getVizPrivacy } from 'vizhub-presenters';

import { ProfilePageDataContext } from '../ProfilePageDataContext';
import { NavBar } from '../../../NavBar';
import { VizPreviews, VizPreview } from '../../../VizPreview';
import { Wrapper, Content } from '../../styles';
import { SidebarWrapper, Main, Sidebar } from '../styles';
import { LinkWithIcon } from '../../VizPage/LinkWithIcon'


export const Body = () => {
  const profilePageData = useContext(ProfilePageDataContext);
  const { user, visualizationInfos } = profilePageData;

  const [visualizations, setVisualizations] = useState(visualizationInfos);

  function showPublic(e) {
    setVisualizations(visualizationInfos.filter((d) => { return getVizPrivacy(d) !== "private"}));
  }
  function showPrivate(e) {
    setVisualizations(visualizationInfos.filter((d) => { return getVizPrivacy(d) === "private"}));
  }

  return (
    <Wrapper>
      <Content>
        <NavBar />
        <SidebarWrapper>
          <Sidebar>
            <LinkWithIcon icon="PeopleSVG" onClick={showPublic}>Public</LinkWithIcon>
            <LinkWithIcon icon="LockSVG" onClick={showPrivate}>Private</LinkWithIcon>

          </Sidebar>
          <Main>
            <VizPreviews className="test-profile-page-viz-previews">
              {visualizations.map((vizInfo) => (
                <VizPreview key={vizInfo.id} vizInfo={vizInfo} ownerUser={user} />
              ))}
            </VizPreviews>
          </Main>
        </SidebarWrapper>
      </Content>
    </Wrapper>
  );
};
