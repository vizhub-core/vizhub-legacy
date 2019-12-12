import React from 'react';
import { Wrapper } from './styles';
export { VizPreviews } from './styles';

export const VizPreview = ({ vizInfo, ownerUserName, openEditor }) => {
  const { id, title } = vizInfo;
  return (
    <Wrapper
      key={id}
      to={`/${ownerUserName}/${id}${openEditor ? '?edit=files' : ''}`}
      title={title}
      style={{
        backgroundImage: `url(/api/visualization/thumbnail/${id}.png)`
      }}
    />
  );
};
