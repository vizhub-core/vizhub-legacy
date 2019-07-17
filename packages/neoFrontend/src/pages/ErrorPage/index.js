import React from 'react';
import { Message } from './styles';

export const ErrorPage = ({ error }) => <Message>{error.message}</Message>;
