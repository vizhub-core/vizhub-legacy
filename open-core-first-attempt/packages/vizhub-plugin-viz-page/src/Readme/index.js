import React from 'react';
import { classed } from 'vizhub-core';
import { useReadmeHTML } from './useReadmeHTML';

const MarkdownBody = classed('markdown-body');

export const Readme = () => {
  const readmeHTML = useReadmeHTML();
  return (
    <MarkdownBody
      id="readme"
      dangerouslySetInnerHTML={{ __html: readmeHTML }}
    />
  );
};
