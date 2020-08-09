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
          <p>
            Upgrade successful! You are now on the VizHub Pro plan. The first 30
            days are free. After that, your card will be automatically charged
            $10 monthly.
          </p>
          <p>
            You can now create and use private vizzes. To make a viz private,
            click the gear icon on the viz page. You now also have a new sidebar
            that allows you to filter your vizzes by public and private.
          </p>
          <p>
            The ability to cancel your subscription plan through the VizHub site
            is still in the works. In the mean time if you want to downgrade,
            please email <code>curran@datavis.tech</code>.
          </p>
          <p>
            If you find any bugs or surprising/frustrating behavior, please{' '}
            <a href="https://github.com/datavis-tech/vizhub-issue-tracker/issues/new">
              open a new issue
            </a>
            . Thanks and welcome to VizHub!
          </p>
        </Content>
      </Wrapper>
      <Feedback />
    </>
  );
};
