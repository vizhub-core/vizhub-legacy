import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { withTheme } from 'styled-components';
import { AuthContext } from '../../../authentication';
import { Avatar } from '../../../Avatar';
import { HorizontalRule } from '../../../styles';
import { Wrapper, Menu, Item } from './styles';
import { useCloseOnGlobalClick } from './useCloseOnGlobalClick';
import {
  showUserActionsMenuCreateViz,
  showUserActionsProfile,
  showAccountPage,
} from '../../../featureFlags';

export const UserActionsMenu = withTheme(({ theme, mobile }) => {
  const { avatarHeight } = theme;

  const { me, signOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useCloseOnGlobalClick(isOpen, close);

  return (
    <Wrapper height={avatarHeight}>
      <Avatar size={avatarHeight} user={me} onClick={open} />
      {isOpen && (
        <Menu mobile={mobile} height={avatarHeight}>
          {showUserActionsMenuCreateViz ? (
            <>
              <Link to="/create-viz">
                <Item className="test-create-viz" topmost={true}>
                  Create Viz
                </Item>
              </Link>
              <HorizontalRule />
            </>
          ) : null}
          {showUserActionsProfile ? (
            <Link to={`/${me.userName}`}>
              <Item>Profile</Item>
            </Link>
          ) : null}
          {showAccountPage ? (
            <Link to={`/${me.userName}/account`}>
              <Item>Account</Item>
            </Link>
          ) : null}
          <HorizontalRule />
          <Item className="test-sign-out" onClick={signOut} bottommost={true}>
            Sign out
          </Item>
        </Menu>
      )}
    </Wrapper>
  );
});
