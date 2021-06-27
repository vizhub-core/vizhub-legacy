import React from 'react';
import { Navigation } from './Navigation';

const Content = ({ children }) => <div className="content">{children}</div>;

export const VizPage = ({ title, sanitizedDescriptionHTML }) => {
  return (
    <>
      <Navigation />
      <Content>
        <h1>{title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: sanitizedDescriptionHTML }}
        ></div>
      </Content>
    </>
  );
};
