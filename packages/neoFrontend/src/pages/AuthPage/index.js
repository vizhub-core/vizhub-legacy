import React from 'react';
import { Wrapper, Content, Banner, Title } from '../styles';
import { BoxWrapper, Box, Button, Octocat, Terms } from './styles';
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
            <Octocat width="120" height="120" src="/images/GitHub-Mark-120px-plus.png" />
            <Button href={GITHUB_OAUTH_URL}>Sign in with GitHub</Button>
            <Terms>
              By signing in you agree to our{' '}
              <a href="https://datavis.tech/static/legal/Terms%20of%20Use.pdf">
                terms of use.
              </a>
            </Terms>
          </Box>
        </BoxWrapper>
      </Content>
    </Wrapper>
  );
};
