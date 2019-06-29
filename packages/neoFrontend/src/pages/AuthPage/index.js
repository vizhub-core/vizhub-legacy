import React from 'react';
import { Wrapper, Content, Banner } from '../styles';
import { BoxWrapper, Box } from './styles';
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
            <a href={GITHUB_OAUTH_URL}>Sign in with GitHub</a>
          </Box>
        </BoxWrapper>
      </Content>
    </Wrapper>
  );
};
