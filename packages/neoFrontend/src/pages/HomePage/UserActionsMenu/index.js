import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../authentication';
import { Avatar } from '../Avatar';
import { AvatarOverlay, AvatarWrapper } from './styles';
import { CloseSVG } from '../../../svg';
import { useToggle } from './useToggle';
import { useClose } from './useClose';
import { useCloseOnGlobalClick } from './useCloseOnGlobalClick';

export const UserActionsMenu = () => {
  const { me } = useContext(AuthContext);
  const [open, setOpen] = useState(true);

  const toggle = useToggle(open, setOpen);

  const close = useClose(setOpen);

  useCloseOnGlobalClick(open, close);

  return (
    <AvatarWrapper>
      <Avatar user={me} onClick={toggle} />
      {open ? (
        <AvatarOverlay>
          {' '}
          <CloseSVG height="25" />
        </AvatarOverlay>
      ) : null}
    </AvatarWrapper>
  );
};

// TODO sign out flow
// TODO add Puppeteer test for sign out flow FIRST
// const { me, signOut } = useContext(AuthContext);
// onClick={signOut} />;
