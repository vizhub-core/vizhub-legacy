import React from 'react';
import {Wrapper} from './styles';

// Use 's=180' because that's what GitHub uses all over the place
// for small avatars, so they are more likely to be cached.
const avatarUrl = user => user.avatarUrl + '&s=180';

export const Avatar = ({user, onClick}) => (
  <Wrapper
    className="test-avatar-me"
    src={avatarUrl(user)}
    alt={user.userName}
    onClick={onClick}
  />
);
