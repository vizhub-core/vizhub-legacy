import React, { useContext } from 'react';
import { LoadingScreen } from '../../LoadingScreen';
import { Wrapper, Content, Centering, Title } from '../styles';
import { NavBar } from '../../NavBar';
import { Vizzes } from '../../VizzesGrid/Vizzes';
import { usePageData, useVizData } from './usePageData';
import { ErrorContext } from '../../ErrorContext';

export const ForksPage = () => {
  const pageData = usePageData();
  const vizData = useVizData();
  const { setError } = useContext(ErrorContext);

  if (vizData && vizData.error) {
    setError({
      message: 'Visualization not found.',
      className: 'test-viz-not-found',
    });
    return null;
  }

  return vizData && pageData ? (
    <Wrapper>
      <Content>
        <NavBar />
        <Title>Forks of {vizData.visualization.info.title}</Title>
        <Centering>
          <Vizzes {...pageData} />
        </Centering>
      </Content>
    </Wrapper>
  ) : (
    <LoadingScreen />
  );
};
