import React from 'react';
import { NavBar } from '../../NavBar';
import { Wrapper, Content, Centering, Text } from '../styles';

export const PricingPage = () => (
  <Wrapper>
    <Content>
      <NavBar />
      <Centering>
        <Text>
          <h1>Pricing</h1>
          <p>Paid plans are in the works, but not available quite yet.</p>
          <p>
            To be one of the first to access paid features, consider backing our{' '}
            <a
              href="https://www.kickstarter.com/projects/curran/vizhub-launch"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              VizHub Launch Kickstarter{'.'}
            </a>
          </p>
          <p>To contact the site owner, email curran@datavis.tech.</p>
        </Text>
      </Centering>
    </Content>
  </Wrapper>
);
