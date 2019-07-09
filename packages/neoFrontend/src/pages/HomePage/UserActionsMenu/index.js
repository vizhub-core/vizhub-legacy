import React, {useContext, useState} from 'react';
import { AuthContext } from '../../../authentication';
import { Avatar } from '../Avatar';
export const UserActionsMenu = () => {
  const { me } = useContext(AuthContext);
  const [ open, setOpen ] = useState(false);
  const toggle = () => setOpen(!open);
  console.log(open);
  return <Avatar user={me} onClick={toggle} />;
};

  // TODO sign out flow
  // TODO add Puppeteer test for sign out flow FIRST
  // const { me, signOut } = useContext(AuthContext);
  // onClick={signOut} />;
