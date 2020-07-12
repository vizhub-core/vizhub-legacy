import React from 'react';
import { showNeoNavBar } from '../featureFlags';
import { NavBar as OldNavBar } from './NavBar';
import { NavBar as NeoNavBar } from './NeoNavBar';

export const NavBar = (props) => {
  return showNeoNavBar ? (
    <NeoNavBar 
      searchProps={props.searchProps}
      showSearch={props.isHomePage || Boolean(props.searchProps)}
      showAuth={!props.isAuthPage}
    />
  ) : (
    <OldNavBar {...props} />
  );
};
