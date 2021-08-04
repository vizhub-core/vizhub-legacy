import React from 'react';
import { classed } from 'vizhub-core';

const Wrapper = classed('head');

// TODO consider renaming this.
// <head> is a top-level HTML element.
// To what?
//   Header? Goes with Footer.
//   TopBar? Goes with SideBar. Might be the winner.
export const Head = ({ headPlugins }) => {
  return (
    <Wrapper>
      {headPlugins.map((Component) => (
        <Component key={Component.name} />
      ))}
    </Wrapper>
  );
};
