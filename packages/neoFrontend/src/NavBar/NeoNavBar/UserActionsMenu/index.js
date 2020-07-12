import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { withTheme } from 'styled-components';
import { AuthContext } from '../../../authentication';
import { Avatar } from '../../../Avatar';
import { Wrapper, Menu, Item, HorizontalRule } from './styles';
import { useCloseOnGlobalClick } from './useCloseOnGlobalClick';

export const UserActionsMenu = withTheme(({ theme }) => {
  const { avatarHeight } = theme;

  const { me, signOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useCloseOnGlobalClick(isOpen, close);

  return (
    <Wrapper height={avatarHeight}>
      <Avatar
        size={avatarHeight}
        user={me}
        onClick={open}
      />
      {isOpen && (
        <Menu height={avatarHeight}>
          <Link to="/create-viz">
            <Item className="test-create-viz" topmost={true}>
              New Visualization
            </Item>
          </Link>
          <HorizontalRule />
          <Link to={`/${me.userName}`}>
            <Item>Profile settings</Item>
          </Link>
          <HorizontalRule />
          <Item className="test-sign-out" onClick={signOut} bottommost={true}>
            Sign out
          </Item>
        </Menu>
      )}
    </Wrapper>
  );
});
