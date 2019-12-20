import React from 'react';
import { Message } from './styles';

export const ErrorPage = ({ error }) => (
  <Message className={error.className}>{error.message}</Message>
);
