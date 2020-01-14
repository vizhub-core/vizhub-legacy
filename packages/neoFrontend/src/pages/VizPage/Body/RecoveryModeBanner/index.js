import React from 'react';
import { Wrapper, Side, Message } from './styles';
import { Button } from '../../../styles';
export const RecoveryModeBanner = () => (
  <Wrapper>
    <Side>
      <Message>You are in recovery mode.</Message>
    </Side>
    <Side>
      <Button>Exit recovery mode</Button>
    </Side>
  </Wrapper>
);
