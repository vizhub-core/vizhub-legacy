import React from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from '../../NavBar';
import { Feedback } from '../../Feedback';
import { Button } from '../../Button';
import { Wrapper, Large, Blurb } from './styles';
import { useCheckoutSession } from './useCheckoutSession';

export const UpgradeSuccessPage = () => {
  const checkoutSession = useCheckoutSession();

  console.log('checkoutSession');
  console.log(checkoutSession);

  return (
    <>
      <NavBar />
      <Wrapper>
        <Large>
          You have <strong>successfully</strong> upgraded to VizHub{' '}
          <strong>Pro</strong>.
        </Large>
        <Blurb>
          <p>To make a viz private, click the gear icon on the viz page.</p>
          <p>
            To downgrade please email <code>curran@datavis.tech</code>.
          </p>
        </Blurb>
        <Link to="/create-viz">
          <Button>Get started</Button>
        </Link>
      </Wrapper>
      <Feedback />
    </>
  );
};
