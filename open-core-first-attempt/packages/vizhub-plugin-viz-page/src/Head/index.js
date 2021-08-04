import React from 'react';
import { EditorToggleButton } from './EditorToggleButton';
import { classed } from 'vizhub-core';

const Wrapper = classed('head');

// TODO expand upon this notion,
// so that we can make other features plugins:
//  - forking
//  - settings
// TODO consider: can plugins have plugins?
//  - e.g. forking as a plugin to viz page plugin
//  - e.g. privacy checkbox as plugin to forking plugin
const headPlugins = [EditorToggleButton];

export const Head = () => {
  return (
    <Wrapper>
      {headPlugins.map((Component) => (
        <Component key={Component.name} />
      ))}
    </Wrapper>
  );
};
