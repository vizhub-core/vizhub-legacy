import React, { useEffect, useState } from 'react';
import { sendEvent } from '../../sendEvent';
import marked from 'marked';
import { NavBar } from '../../NavBar';
import { Wrapper, Content, Copy, CopyWrapper } from '../styles';

export const TermsPage = () => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    sendEvent('event.pageview.terms');
  }, []);

  useEffect(() => {
    const fetchMarkdown = async () => {
      const response = await fetch('/terms.md');
      setHtml(marked(await response.text()));
    };
    fetchMarkdown();
  }, []);

  return (
    <Wrapper>
      <Content>
        <NavBar />
        <CopyWrapper>
          <Copy dangerouslySetInnerHTML={{ __html: html }} />
        </CopyWrapper>
      </Content>
    </Wrapper>
  );
};
