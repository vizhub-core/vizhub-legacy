import React, { useRef } from 'react';
import { useToggleButton } from '@react-aria/button';
import { useToggleState } from '@react-stately/toggle';

// Inspired by
// https://react-spectrum.adobe.com/react-aria/useToggleButton.html
// https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/toggle/src/useToggleState.ts

// TODO refactor to new package vizhub-ui,
// eventually make dedicated browser build for CDN hosting
// that bundles react-area and react-stately dependencies
export const ToggleButton = (props) => {
  const ref = useRef();
  const state = useToggleState(props);
  const { buttonProps, isPressed } = useToggleButton(props, state, ref);

  return (
    <button
      className={props.className}
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
      }}
      ref={ref}
    >
      {props.children}
    </button>
  );
};
