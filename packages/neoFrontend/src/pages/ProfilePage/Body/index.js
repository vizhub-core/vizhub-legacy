import React, { useContext } from 'react';
import { ProfilePageDataContext } from '../ProfilePageDataContext';
import { NavBar } from '../../../NavBar';
import { Wrapper, Content } from '../../styles';
import { VizPreviews, VizPreview, VizPreviewImage } from './styles';

export const Body = () => {
  const profilePageData = useContext(ProfilePageDataContext);
  const { user, visualizationInfos } = profilePageData;
  const { userName } = user;
  console.log(JSON.stringify(profilePageData, null, 2));

  return (
    <Wrapper>
      <Content>
        <NavBar />
        <VizPreviews>
          {visualizationInfos.map(({ id }) => (
            <VizPreview key={id} to={`/${userName}/${id}`}>
              <VizPreviewImage
                style={{
                  backgroundImage: `url(/api/visualization/thumbnail/${id}.png)`
                }}
              />
            </VizPreview>
          ))}
        </VizPreviews>
      </Content>
    </Wrapper>
  );
};
