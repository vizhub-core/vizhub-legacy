import React from 'react';
import { Navigation } from '../Navigation';
import { classed } from '../classed';

const Wrapper = classed('viz-page');
const Head = classed('head');
const Sidebar = classed('sidebar');
const ContentWrapper = classed('content-wrapper');
const Content = classed('content');

export const VizPage = ({ title, sanitizedDescriptionHTML }) => {
  return (
    <>
      <Navigation />
      <Wrapper>
        <Head />
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
