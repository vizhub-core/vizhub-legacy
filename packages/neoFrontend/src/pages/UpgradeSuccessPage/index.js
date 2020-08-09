import React from 'react';
import { NavBar } from '../../NavBar';
import { Feedback } from '../../Feedback';
import { Wrapper, Content } from '../styles';
import { useCheckoutSession } from './useCheckoutSession';

export const UpgradeSuccessPage = () => {
  const checkoutSession = useCheckoutSession();

  console.log('checkoutSession');
  console.log(checkoutSession);

  return (
    <>
      <NavBar />
      <Wrapper>
        <Content>
          Upgrade successful! You are now on the VizHub Pro plan. You can now
          create and use private vizzes (click the gear icon).
        </Content>
      </Wrapper>
      <Feedback />
    </>
  );
};
