import React from 'react';
import { NavBar } from '../../NavBar';
import { Wrapper, Content, Centering } from '../styles';
import { Text } from './styles';

export const ContactPage = () => (
  <Wrapper>
    <Content>
      <NavBar />
      <Centering>
        <Text>
          <h1>Welcome to VizHub 2.0 beta!</h1>
          <p>
            This software is work in progress. To report bugs or feature
            requests, please check out our{' '}
            <a href="https://discourse.vizhub.com">user community forum</a>.
          </p>
          <p>To contact the site owner, email curran@datavis.tech.</p>
        </Text>
      </Centering>
    </Content>
  </Wrapper>
);
