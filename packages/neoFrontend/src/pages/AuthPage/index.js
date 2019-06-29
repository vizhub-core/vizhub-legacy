import React from 'react';
import { Wrapper, Content, Banner, Title } from '../styles';
import { BoxWrapper, Box, Button } from './styles';
import { LogoSVG } from '../../svg';
import { GITHUB_OAUTH_URL } from '../../authentication';

export const AuthPage = () => {
  return (
    <Wrapper>
      <Content>
        <Banner>
          <LogoSVG height={40} fill="currentcolor" />
        </Banner>
        <BoxWrapper>
          <Box>
            <Title>Sign up or Sign in</Title>
            If you don't have an account, one will be created when you sign in.
            <Button href={GITHUB_OAUTH_URL}>Sign in with GitHub</Button>
          </Box>
        </BoxWrapper>
      </Content>
    </Wrapper>
  );
};
