import React from 'react';
import { NavBar } from '../../NavBar';
import { Wrapper, Content, CopyWrapper } from '../styles';
import { Stats } from './styles';

export const VizHubStatsPage = () => {
  return (
    <>
      <NavBar />
      <Wrapper>
        <Content>
          <Stats>Stats</Stats>
        </Content>
      </Wrapper>
    </>
  );
};
