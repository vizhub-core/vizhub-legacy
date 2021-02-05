import React, { useContext, useEffect } from 'react';
import { Redirect, useParams } from 'react-router';

import { showAccountPage } from '../../featureFlags'
import { AUTH_PENDING } from '../../authentication/constants';
import { sendEvent } from '../../sendEvent';
import { NavBar } from '../../NavBar';
import { Feedback } from '../../Feedback';
import { AuthContext } from '../../authentication';
import { Wrapper, Content } from '../styles';
import { Badge, Label } from './styles';

export const AccountPage = () => {
  const { userName } = useParams();
  const { me } = useContext(AuthContext);

  const viewer = (me && me.id) || 'anonymous';

  useEffect(() => {
    sendEvent(`event.pageview.account.viewer:${viewer}`);
  }, [viewer]);


  if(!showAccountPage) {
    return <Redirect push to="/404" />
  }
  
  const isLoadingAuthData = me === AUTH_PENDING;

  if (!isLoadingAuthData) {
    if (me.userName !== userName) {
      return <Redirect push to="/404" />
    }

    return (
      <>
        <NavBar />
        <Wrapper>
          <Content>
            <Badge>
              <Label>{me.plan ? me.plan.toUpperCase() : 'FREE'}</Label>
            </Badge>
          </Content>
        </Wrapper>
        <Feedback />
      </>
    );
  }

  return null;
};
