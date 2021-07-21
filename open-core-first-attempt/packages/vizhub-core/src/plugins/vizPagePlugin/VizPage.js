import React from 'react';

export const VizPage = ({ vizInfoSnapshot }) => {
  // TODO introduce context that instantiates a VizInfo
  // entity - static with no ShareDB if server rendered,
  // dynamic with ingestSnapshot if client rendered.
  return <div>{vizInfoSnapshot.data.title}</div>;
};
