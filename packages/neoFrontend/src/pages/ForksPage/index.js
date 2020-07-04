import React from 'react';
import { LoadingScreen } from '../../LoadingScreen';
import { Wrapper, Content, Centering } from '../styles';
import { NavBar } from '../../NavBar';
import { Vizzes } from '../../VizzesGrid/Vizzes';
import { usePageData } from './usePageData';

export const ForksPage = () => {
  const pageData = usePageData();

  return pageData ? (
    <>
      <NavBar showAuth />
      <Wrapper>
        <Content>
          <Centering>
            <Vizzes {...pageData} />
          </Centering>
        </Content>
      </Wrapper>
    </>
  ) : (
    <LoadingScreen />
  );
};
