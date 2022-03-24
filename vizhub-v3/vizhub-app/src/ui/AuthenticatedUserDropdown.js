import React, { forwardRef } from 'react';
import { Dropdown, Image } from './Bootstrap';

// Inspired by:
// https://react-bootstrap.netlify.app/components/dropdowns/#custom-dropdown-components
const AvatarToggle = forwardRef(({ children, onClick }, ref) => (
  <button
    type="button"
    className="navbar__avatar-toggle dropdown-toggle"
    ref={ref}
    onClick={onClick}
  >
    {children}
  </button>
));

export const AuthenticatedUserDropdown = ({ renderLogout }) => (
  <Dropdown align="end">
    <Dropdown.Toggle as={AvatarToggle}>
      <Image
        src="https://github.com/mdo.png"
        roundedCircle
        width="32"
        height="32"
      />
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href="#create-viz">Create Viz</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="#create-viz">Profile</Dropdown.Item>
      <Dropdown.Divider />
      {renderLogout()}
    </Dropdown.Menu>
  </Dropdown>
);
