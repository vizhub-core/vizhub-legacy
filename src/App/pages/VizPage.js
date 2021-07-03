import React from 'react';
import { Navigation } from '../Navigation';
import { classed } from '../classed';

const Wrapper = classed('viz-page');
const Head = classed('head');
const Sidebar = classed('sidebar');
const ContentWrapper = classed('content-wrapper');
const Content = classed('content');
const MarkdownBody = classed('markdown-body');

const showSidebar = false;

export const VizPage = ({ title, sanitizedDescriptionHTML, previewUrl }) => {
  return (
    <>
      <Navigation />
      <Wrapper>
        <Head />
        {/* TODO load the actual viz */}
        <img src={previewUrl} />
        {showSidebar ? <Sidebar /> : null}
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
