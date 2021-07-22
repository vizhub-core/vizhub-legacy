import React from 'react';
import { isClient } from '../../isClient';

export const VizPage = ({ vizInfoSnapshot }) => {
  console.log('VizPage: isClient === ' + isClient);
  // TODO introduce context that instantiates a VizInfo
  // entity - static with no ShareDB if server rendered,
  // dynamic with ingestSnapshot if client rendered.
  return <div>{vizInfoSnapshot.data.title}</div>;
};
