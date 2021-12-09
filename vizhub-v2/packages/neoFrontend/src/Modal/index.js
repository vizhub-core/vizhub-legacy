import React, { useCallback } from 'react';
import { CloseSVG } from '../svg';
import { FullscreenOverlay, Box, CloseIcon, Message } from './styles';

export const Modal = ({ children, onClose, closeButtonClassName }) => {
  const handleClickOutsideBox = useCallback(
    (event) => {
      if (event.currentTarget === event.target) onClose();
    },
    [onClose]
  );
  return (
    // onClick can't be used.
    // after text selection that finished outside Box component happens
    // click event is triggered in FullscreenOverlay and it can't be canceled
    <FullscreenOverlay onMouseDown={handleClickOutsideBox}>
      <Box>
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
    </FullscreenOverlay>
  );
};

Modal.Message = Message;
