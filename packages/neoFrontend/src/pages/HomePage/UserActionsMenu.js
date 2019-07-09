import React, {useContext} from 'react';
import { AuthContext } from '../../authentication';
import { Avatar } from './Avatar';
export const UserActionsMenu = () => {
  const { me, signOut } = useContext(AuthContext);
  return <Avatar user={me} onClick={signOut} />;
};

