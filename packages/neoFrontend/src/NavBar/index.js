import React from 'react';
import { NeoNavBar } from './NeoNavBar';

export const NavBar = (props) => (
  <NeoNavBar
    isHomePage={props.isHomePage}
    searchProps={props.searchProps}
    showSearch={props.isHomePage || Boolean(props.searchProps)}
    showAuth={!props.isAuthPage}
  />
);
