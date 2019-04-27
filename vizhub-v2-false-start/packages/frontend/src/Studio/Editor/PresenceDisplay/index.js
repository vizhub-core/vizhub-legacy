import React from 'react';
import { Wrapper } from './styles';

export const PresenceDisplay = ({ data }) => {
  // console.log(data);
  return data
    ? data.map(({ pixelCoordsFrom, pixelCoordsTo }, i) => {
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
