import React, { useContext } from 'react';
import { VizContext } from './VizContext';

export const Body = () => {
  const { vizInfo } = useContext(VizContext);
  const { title } = vizInfo;
  return <div className="title">{title}</div>;
};
