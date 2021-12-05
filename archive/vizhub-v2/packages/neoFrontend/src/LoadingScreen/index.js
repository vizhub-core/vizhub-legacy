import React, { useState, useEffect } from 'react';
import { SpinnerSVG } from '../svg';
import { LoadingScreenWrapper, Spinning, Message } from './styles';
import { blankScreenDelay } from './animationDelay';
export { waitForSpinner } from './waitForSpinner';

export const LoadingScreen = ({
  message,
  color,
  background = 'transparent',
  isChild = false,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShow(true);
    }, blankScreenDelay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const opacity = show ? 1 : 0;

  return (
    <LoadingScreenWrapper background={background} isChild={isChild}>
      <Spinning style={{ opacity }}>
        <SpinnerSVG fill={color} />
      </Spinning>
      {message ? <Message style={{ opacity }}>{message}</Message> : null}
    </LoadingScreenWrapper>
  );
};
