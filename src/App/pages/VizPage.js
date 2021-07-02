import React from 'react';
import { Navigation } from '../Navigation';
import { classed } from '../classed';

const Wrapper = classed('viz-page');
const Head = classed('head');
const Sidebar = classed('sidebar');
const ContentWrapper = classed('content-wrapper');
const Content = classed('content');
const MarkdownBody = classed('markdown-body');

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
            <MarkdownBody
              dangerouslySetInnerHTML={{ __html: sanitizedDescriptionHTML }}
            ></MarkdownBody>
          </Content>
        </ContentWrapper>
      </Wrapper>
    </>
  );
};
