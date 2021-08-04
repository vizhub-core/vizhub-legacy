import React from 'react';
import { classed } from 'vizhub-core';
import { useReadmeHTML } from './useReadmeHTML';

const MarkdownBody = classed('markdown-body');

export const Readme = () => (
  <MarkdownBody
    id="readme"
    dangerouslySetInnerHTML={{ __html: useReadmeHTML() }}
  />
);
