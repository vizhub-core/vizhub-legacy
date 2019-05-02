import React from 'react';
import { Wrapper } from './styles';

// Gets the file ID in the presence path.
// This is the file that the presence is "in".
// The presence should be hidden if the current user
// is not also "in" the same file.
const fileId = p => p[p.length - 2];

export const PresenceDisplay = ({ data, userId, activeFileId }) => {
  if (!data) return null;

  // Don't show presence for yourself.
  data = data.filter(({ presence }) => presence.s.u !== userId);

  // Don't show presence for a file that's not open.
  data = data.filter(({ presence }) => fileId(presence.p) === activeFileId);

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
