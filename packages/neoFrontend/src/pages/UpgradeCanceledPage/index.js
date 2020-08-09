import React from 'react';
import { NavBar } from '../../NavBar';
import { Feedback } from '../../Feedback';
import { Wrapper, Content } from '../styles';

export const UpgradeCanceledPage = () => {
  return (
    <>
      <NavBar />
      <Wrapper>
        <Content>Upgrade canceled.</Content>
      </Wrapper>
      <Feedback />
    </>
  );
};
