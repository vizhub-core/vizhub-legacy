import React from 'react';
import { Wrapper, Box, CloseButton } from './styles';
import { CloseSVG } from '../../../../svg';
import { Icon } from '../../../styles';

// Inspired by:
// https://wecodetheweb.com/2019/03/02/easy-modals-with-react-hooks/

export const Modal = ({ children, onClose }) => (
  <Wrapper onClick={onClose}>
    <Box>
      <Icon onClick={onClose}>
        <CloseSVG />
      </Icon>
      {children}
    </Box>
  </Wrapper>
);
