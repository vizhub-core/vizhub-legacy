import React, { useState, useEffect } from 'react';
import { SpinnerSVG } from '../svg';
import { LoadingScreenWrapper, Spinning, Message } from './styles';
import { blankScreenDelay } from './animationDelay';
export { waitForSpinner } from './waitForSpinner';

export const LoadingScreen = ({ message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShow(true);
    }, blankScreenDelay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <LoadingScreenWrapper style={{ opacity: show ? 1 : 0 }}>
      <Spinning>
        <SpinnerSVG />
      </Spinning>
      {message ? <Message>{message}</Message> : null}
    </LoadingScreenWrapper>
  );
};
