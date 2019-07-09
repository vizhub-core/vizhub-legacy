import React, { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from '../../../authentication';
import { Avatar } from '../Avatar';
import { AvatarOverlay, AvatarWrapper } from './styles';
import { CloseSVG } from '../../../svg';

// Close the menu if the user clicks anywhere else on the page.
const useCloseOnGlobalClick = (open, close) => {
  useEffect(() => {
    if (open) {
      document.addEventListener('click', close);
      return () => {
        document.removeEventListener('click', close);
      };
    }
  }, [open, close]);
};

export const UserActionsMenu = () => {
  const { me } = useContext(AuthContext);
  const [open, setOpen] = useState(true);

  const toggle = useCallback(
    event => {
      setOpen(!open);
    },
    [open]
  );

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

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
