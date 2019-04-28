import React from 'react';
import { Wrapper } from './styles';

export const PresenceDisplay = ({ data, userId }) => {
  // console.log(data);
  return data
    ? data
        .filter(({ presence }) => presence.s.u !== userId)
        .map(({ pixelCoordsFrom, pixelCoordsTo, presence }, i) => {
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
        })
    : null;
};
