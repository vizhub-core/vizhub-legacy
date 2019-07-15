import React from 'react';
import { Wrapper, Image, InnerBorder } from './styles';

// Use 's=180' because that's what GitHub uses all over the place
// for small avatars, so they are more likely to be cached.
//const avatarUrl = user => user.avatarUrl + '&s=180';
const avatarUrl = user =>
  'https://avatars0.githubusercontent.com/u/139208?s=180';

export const Avatar = ({ user, onClick, size, borderColor }) => (
  <Wrapper onClick={onClick}>
    <InnerBorder borderColor={borderColor} size={size}>
      <Image
        size={size}
        className="test-avatar-me"
        src={avatarUrl(user)}
        alt={user.userName}
      />
    </InnerBorder>
  </Wrapper>
);
