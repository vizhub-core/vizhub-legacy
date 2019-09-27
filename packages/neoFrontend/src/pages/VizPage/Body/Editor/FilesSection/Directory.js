import React from 'react';
import { FileEntry } from './styles';

export const Directory = ({ name, indent }) => (
  <FileEntry indent={indent}>{name}</FileEntry>
);
