import React from 'react';
import { CloseSVG } from '../svg';
import { Wrapper, Box, CloseIcon, Message } from './styles';

const stopPropagation = event => event.stopPropagation();

export const Modal = ({ children, onClose, closeButtonClassName = null }) => (
  <Wrapper onClick={onClose}>
    <Box onClick={stopPropagation}>
      <CloseIcon onClick={onClose} rightmost={true} leftmost={true} className={}>
        <CloseSVG />
      </CloseIcon>
      {children}
    </Box>
  </Wrapper>
);

Modal.Message = Message;
