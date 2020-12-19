import React, { useEffect } from 'react';
import { sendEvent } from '../../sendEvent';
import { NavBar } from '../../NavBar';
import { Wrapper, Content, Copy, CopyWrapper } from '../styles';

export const ContactPage = () => {
  useEffect(() => {
    sendEvent('event.pageview.contact');
  }, []);

  return (
    <Wrapper>
      <Content>
        <NavBar />
        <CopyWrapper>
          <Copy>
            <h1>Contact VizHub</h1>
            <p>
              To provide feedback such as bug reports or feature requests,
              please{' '}
              <a href="https://github.com/datavis-tech/vizhub-issue-tracker/issues/new">
                {' '}
                open an issue{' '}
              </a>
              .
            </p>
            <p>
              For personal account questions, please email curran@datavis.tech.
            </p>
          </Copy>
        </CopyWrapper>
      </Content>
    </Wrapper>
  );
};
