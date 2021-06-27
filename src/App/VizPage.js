import React from 'react';
import { Navigation } from './Navigation';

const classed =
  (className) =>
  ({ children }) =>
    <div className={className}>{children}</div>;

const Wrapper = classed('viz-page-wrapper');
const Sidebar = classed('sidebar');
const ContentWrapper = classed('content-wrapper');
const Content = classed('content');

export const VizPage = ({ title, sanitizedDescriptionHTML }) => {
  return (
    <>
      <Navigation />
      <Wrapper>
        <Sidebar />
        <ContentWrapper>
          <Content>
            <h1>{title}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: sanitizedDescriptionHTML }}
            ></div>
          </Content>
        </ContentWrapper>
      </Wrapper>
    </>
  );
};
