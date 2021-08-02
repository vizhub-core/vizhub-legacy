import React, { useRef } from 'react';
import { useToggleButton } from '@react-aria/button';

import { useToggleState } from '@react-stately/toggle';
import { classed } from 'vizhub-core';

const Wrapper = classed('head');

// Inspired by
// https://react-spectrum.adobe.com/react-aria/useToggleButton.html
// https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/toggle/src/useToggleState.ts

// TODO make it work
// TODO refactor to new package vizhub-ui,
// eventually make dedicated browser build for CDN hosting
// that bundles react-area and react-stately dependencies

const EditorToggleButton = (props) => {
  const ref = useRef();
  const state = useToggleState();
  const { buttonProps, isPressed } = useToggleButton(props, state, ref);

  return (
    <button
      {...buttonProps}
      style={{
        background: isPressed
          ? state.isSelected
            ? 'darkblue'
            : 'darkgreen'
          : state.isSelected
          ? 'blue'
          : 'green',
        color: 'white',
        cursor: 'pointer',
        userSelect: 'none',
        border: 'none',
      }}
      ref={ref}
    >
      {props.children}
    </button>
  );
};

export const Head = () => {
  return (
    <Wrapper>
      <EditorToggleButton>Test</EditorToggleButton>
    </Wrapper>
  );
};
