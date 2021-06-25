import React from 'react';

export const VizPage = ({ title, sanitizedDescriptionHTML }) => {
  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: sanitizedDescriptionHTML }}></div>
    </>
  );
};
