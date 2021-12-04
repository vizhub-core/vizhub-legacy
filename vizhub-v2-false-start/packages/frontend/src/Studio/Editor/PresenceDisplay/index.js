import React from 'react';
import { Wrapper } from './styles';
import { getFileId } from './getFileId';

export const PresenceDisplay = ({ data, userId, activeFileId }) => {
  if (!data) return null;

  // Don't show presence for yourself.
  data = data.filter(({ presence }) => presence.s.u !== userId);

  // Don't show presence for a file that's not open.
  data = data.filter(({ presence }) => getFileId(presence) === activeFileId);

  // Generate indicators for the selection start and end.
  return data.map(({ pixelCoordsFrom, pixelCoordsTo, presence }, i) => {
    return (
      <div key={i}>
        <Wrapper
          x={pixelCoordsFrom.x}
          y={pixelCoordsFrom.y}
          height={pixelCoordsFrom.height}
        />
        <Wrapper
          x={pixelCoordsTo.x}
          y={pixelCoordsTo.y}
          height={pixelCoordsTo.height}
        />
      </div>
    );
  });
};
