import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../authentication';
import { Avatar } from '../Avatar';
import { AvatarOverlay, Wrapper, Menu, Item, HorizontalRule } from './styles';
import { CloseSVG } from '../../../svg';
import { useCloseOnGlobalClick } from './useCloseOnGlobalClick';

export const UserActionsMenu = () => {
  const { me, signOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useCloseOnGlobalClick(isOpen, close);

  return (
    <Wrapper>
      <Avatar user={me} onClick={open} />
      {isOpen ? (
        <>
          <AvatarOverlay>
            <CloseSVG />
          </AvatarOverlay>
          <Menu>
            <Item>Create Visualization</Item>
            <HorizontalRule />
            <Item className="test-sign-out" onClick={signOut}>
              Sign out
            </Item>
          </Menu>
        </>
      ) : null}
    </Wrapper>
  );
};

// TODO sign out flow
//  />;
