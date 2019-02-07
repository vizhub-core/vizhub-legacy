import React from 'react';

const defaultScale = 30;
export const Avatar = ({avatarUrl, scale = defaultScale}) => (
  <img
    style={{
      borderRadius: `${scale / 2}px`,
      marginBottom: `-${scale / 2 - 5}px`,
      marginRight: `${scale * 5/30}px`
    }}
    height={scale}
    width={scale}
    src={`${avatarUrl}&s=${scale * 2}`}
  />
);
