import React from 'react';

export const VizPage = ({ vizInfoSnapshot }) => {
  return <div>{vizInfoSnapshot.data.title}</div>;
};
