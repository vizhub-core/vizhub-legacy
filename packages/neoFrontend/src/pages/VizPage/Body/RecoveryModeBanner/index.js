import React from 'react';
import { Wrapper, Side, Message } from './styles';
import { Button } from '../../../styles';
export const RecoveryModeBanner = ({ exitRecoveryMode }) => (
  <Wrapper>
    <Side>
      <Message>You are in recovery mode.</Message>
    </Side>
    <Side>
      <Button onClick={exitRecoveryMode}>Exit recovery mode</Button>
    </Side>
  </Wrapper>
);
