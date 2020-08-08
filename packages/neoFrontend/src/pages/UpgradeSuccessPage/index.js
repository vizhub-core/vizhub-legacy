import React from 'react';
import { NavBar } from '../../NavBar';
import { Feedback } from '../../Feedback';
import { Wrapper, Content } from '../styles';

export const UpgradeSuccessPage = () => {
  return (
    <>
      <NavBar />
      <Wrapper>
        <Content>
          Upgrade successful! You are now on the VizHub Pro plan.
        </Content>
      </Wrapper>
      <Feedback />
    </>
  );
};
