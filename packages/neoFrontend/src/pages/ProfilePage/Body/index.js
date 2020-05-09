import React, { useContext } from 'react';
import { ProfilePageDataContext } from '../ProfilePageDataContext';
import { NavBar } from '../../../NavBar';
import { VizPreviews, VizPreview } from '../../../VizPreview';
import { Wrapper, Content } from '../../styles';

export const Body = () => {
  const profilePageData = useContext(ProfilePageDataContext);
  const { user, visualizationInfos } = profilePageData;

  return (
    <Wrapper>
      <Content>
        <NavBar />
        <VizPreviews className="test-profile-page-viz-previews">
          {visualizationInfos.map((vizInfo) => (
            <VizPreview key={vizInfo.id} vizInfo={vizInfo} ownerUser={user} />
          ))}
        </VizPreviews>
      </Content>
    </Wrapper>
  );
};
