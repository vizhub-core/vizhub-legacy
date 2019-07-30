import React from 'react';
import { Link } from 'react-router-dom';
import { Banner } from '../../styles';
import {
  Wrapper,
  Content,
  Title,
  Button,
  DevsOnly,
  Centering
} from '../styles';
import { Box, Octocat, Terms } from './styles';
import { LogoSVG } from '../../svg';
import { GITHUB_OAUTH_URL, CI_AUTH_PATH } from '../../authentication';

export const AuthPage = () => {
  return (
    <Wrapper>
      <Content>
        <Banner>
          <LogoSVG height={40} fill="currentcolor" />
        </Banner>
        <Centering>
          <Box>
            <Title>Sign up or Sign in</Title>
            If you don't have an account, one will be created when you sign in.
            <Octocat
              width="120"
              height="120"
              src="/images/GitHub-Mark-120px-plus.png"
            />
            <a href={GITHUB_OAUTH_URL}>
              <Button>Sign in with GitHub</Button>
            </a>
            <Terms>
              By signing in you agree to our{' '}
              <a href="https://datavis.tech/static/legal/Terms%20of%20Use.pdf">
                terms of use.
              </a>
            </Terms>
            {process.env.NODE_ENV === 'development' ? (
              <>
                <DevsOnly>
                  <Title>For developers only</Title>
                </DevsOnly>
                <Link to={CI_AUTH_PATH}>
                  <Button className="test-sign-in-as-ci">Sign in as CI</Button>
                </Link>
              </>
            ) : null}
          </Box>
        </Centering>
      </Content>
    </Wrapper>
  );
};
