import React, { useEffect } from 'react';
import { LoadingScreen } from '../../LoadingScreen';
import { Wrapper, Content, Centering } from '../styles';
import { sendEvent } from '../../sendEvent';
import { NavBar } from '../../NavBar';
import { PageDataProvider } from './PageDataContext';
import { Vizzes } from './Vizzes';

export const SearchResultsPage = () => {
  useEffect(() => {
    sendEvent('event.pageview.search');
  }, []);

  return (
    <PageDataProvider fallback={<LoadingScreen />}>
      <NavBar showSearch />
      <Wrapper>
        <Content>
          <Centering>
            <Vizzes />
          </Centering>
        </Content>
      </Wrapper>
    </PageDataProvider>
  );
};
