import React, { useContext } from 'react';
import { ProfilePageDataContext } from '../ProfilePageDataContext';
import { NavBar } from '../../../NavBar';
import { VizPreviews, VizPreview } from '../../../VizPreview';
import { Wrapper, Content, Sidebar } from '../../styles';

export const Body = () => {
  const profilePageData = useContext(ProfilePageDataContext);
  const { user, visualizationInfos } = profilePageData;

  const privateViz = visualizationInfos.filter((d) => { return d.privacy === "private"});
  const publicViz = visualizationInfos.filter((d) => { return d.privacy === "public"});

  return (
    <Wrapper>
      <Content>
        <NavBar />
        <Sidebar>
        </Sidebar>
        <VizPreviews className="test-profile-page-viz-previews">
          {privateViz.map((vizInfo) => (
            <VizPreview key={vizInfo.id} vizInfo={vizInfo} ownerUser={user} />
          ))}
        </VizPreviews>
      </Content>
    </Wrapper>
  );
};
