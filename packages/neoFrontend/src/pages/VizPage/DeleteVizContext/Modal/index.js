import React from 'react';
import { CloseSVG } from '../../../../svg';
import { Wrapper, Box, CloseIcon } from './styles';

export const Modal = ({ children, onClose }) => (
  <Wrapper onClick={onClose}>
    <Box>
      <CloseIcon onClick={onClose} rightmost={true} leftmost={true}>
        <CloseSVG />
      </CloseIcon>
      {children}
    </Box>
  </Wrapper>
);
