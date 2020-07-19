import React, { useEffect, useState } from 'react';
import marked from 'marked';

import { NavBar } from '../../NavBar';
import { Wrapper, Content } from '../styles';

export const TermsPage = () => {
  const [html, setHtml] = useState('');
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
        Terms and Conditions
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Content>
    </Wrapper>
  );
};
