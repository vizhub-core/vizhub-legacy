import React from 'react';
import { Wrapper, PresenceAvatar, PresenceAvatarContainer } from './styles';

export const PresenceWidget = ({
  charWidth,
  userColor,
  height,
  userId,
  isFirstLine,
}) => {
  return (
    <Wrapper
      style={{
        borderRightWidth: charWidth + 'px',
        borderRightColor: userColor,
        height: `${height}px`,
      }}
    >
      <PresenceAvatarContainer isFirstLine={isFirstLine}>
        <PresenceAvatar
          userColor={userColor}
          src={`https://avatars0.githubusercontent.com/u/${userId}?v=4&s=32`}
        />
      </PresenceAvatarContainer>
    </Wrapper>
  );
};
