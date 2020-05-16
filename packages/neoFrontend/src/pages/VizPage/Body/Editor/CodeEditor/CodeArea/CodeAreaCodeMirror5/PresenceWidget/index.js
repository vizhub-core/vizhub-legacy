import React from 'react';
import { Wrapper, PresenceAvatar } from './styles';

export const PresenceWidget = ({ charWidth, userColor, height, userId }) => {
  console.log(userId);
  return (
    <Wrapper
      style={{
        borderRightWidth: charWidth + 'px',
        borderRightColor: userColor,
        height: `${height}px`,
      }}
    >
      <PresenceAvatar
        src={`https://avatars0.githubusercontent.com/u/${userId}?v=4&s=32`}
      />
    </Wrapper>
  );
};
