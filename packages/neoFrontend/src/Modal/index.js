import React, { useEffect } from 'react';
import { CloseSVG } from '../svg';
import { Wrapper, Box, CloseIcon, Message } from './styles';

const stopPropagation = event => event.stopPropagation();

const isEscapeKey = ({ code }) => code === 'Escape';

export const Modal = ({ children, onClose, closeButtonClassName }) => {
  useEffect(() => {
    const onKeyDown = event => {
      if (isEscapeKey(event)) {
        // Don't let anything else handle this press of escape.
        stopPropagation(event);

        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);
  return (
    <Wrapper onClick={onClose}>
      <Box onClick={stopPropagation}>
        <CloseIcon
          onClick={onClose}
          rightmost={true}
          leftmost={true}
          className={closeButtonClassName}
        >
          <CloseSVG />
        </CloseIcon>
        {children}
      </Box>
    </Wrapper>
  );
};

Modal.Message = Message;
