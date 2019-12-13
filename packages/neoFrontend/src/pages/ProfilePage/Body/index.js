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
        <VizPreviews>
          {visualizationInfos.map(vizInfo => (
            <VizPreview vizInfo={vizInfo} openEditor={true} ownerUser={user} />
          ))}
        </VizPreviews>
      </Content>
    </Wrapper>
  );
};
