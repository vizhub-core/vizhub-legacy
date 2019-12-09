import React from 'react';
import { Wrapper } from './styles';

// Inspired by:
// https://wecodetheweb.com/2019/03/02/easy-modals-with-react-hooks/

export const Modal = ({ children, onClose }) => (
  <Wrapper onClick={onClose}>{children}</Wrapper>
);
