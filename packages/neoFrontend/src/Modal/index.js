import React from 'react';
import { CloseSVG } from '../svg';
import { Wrapper, Box, CloseIcon, Message } from './styles';

const stopPropagation = event => event.stopPropagation();

export const Modal = ({ children, onClose, closeButtonClassName }) => (
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

Modal.Message = Message;
