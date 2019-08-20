import React, { useContext } from 'react';
import { ProfilePageDataContext } from '../ProfilePageDataContext';
import { VizPreview, VizPreviewImage } from './styles';

export const Body = () => {
  const profilePageData = useContext(ProfilePageDataContext);
  const { user, visualizationInfos } = profilePageData;
  const { userName } = user;
  console.log(JSON.stringify(profilePageData, null, 2));
  return visualizationInfos.map(({ id }) => {
    const url = `/api/visualization/thumbnail/${id}.png`;
    return (
      <VizPreview key={id} to={`/${userName}/${id}`}>
        <VizPreviewImage style={{ backgroundImage: `url(${url})` }} />
      </VizPreview>
    );
  });
};
