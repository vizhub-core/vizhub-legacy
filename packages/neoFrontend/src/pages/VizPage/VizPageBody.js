import React, { useContext } from 'react';
import { NavBar } from '../../NavBar';
import { Wrapper, Content } from '../styles';
import { URLStateContext } from './URLStateContext';

export const VizPageBody = () => {
  const { vizId } = useContext(URLStateContext);
  return (
    <Wrapper>
      <Content>
        <NavBar />
        Hello viz {vizId}!
      </Content>
    </Wrapper>
  );
};
