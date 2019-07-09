import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../authentication';
import { CloseSVG } from '../../../svg';
import { Avatar } from './Avatar';
import { AvatarOverlay, Wrapper, Menu, Item, HorizontalRule } from './styles';
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
            <Link to="create-visualization">
              <Item className="test-create-visualization">
                Create Visualization
              </Item>
            </Link>
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
