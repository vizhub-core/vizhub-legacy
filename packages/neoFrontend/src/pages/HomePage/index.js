import React, { useContext } from 'react';
import { LoadingScreen } from '../../LoadingScreen';
import { Wrapper, Content, Centering, Text } from '../styles';
import { VizPreviews, VizPreview } from '../../VizPreview/styles';
import {
  HomePageDataProvider,
  HomePageDataContext
} from './HomePageDataContext';
import { NavBar } from '../../NavBar';

// TODO use correct usernames
const userName = 'undefined';

const Vizzes = () => {
  const homePageData = useContext(HomePageDataContext);
  return (
    <VizPreviews>
      {homePageData.map(({ id, title }) => (
        <VizPreview
          key={id}
          to={`/${userName}/${id}?edit=files`}
          title={title}
          style={{
            backgroundImage: `url(/api/visualization/thumbnail/${id}.png)`
          }}
        />
      ))}
    </VizPreviews>
  );
};

export const HomePage = () => (
  <HomePageDataProvider fallback={<LoadingScreen />}>
    <Wrapper>
      <Content>
        <NavBar />
        <Centering>
          <Text>
            <h1>Welcome to VizHub 2.0 beta!</h1>
            <p>
              To report bugs or feature requests, or to ask for help, please
              check out our{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://discourse.vizhub.com"
              >
                user forum
              </a>
              .
            </p>
          </Text>
          <Vizzes />
        </Centering>
      </Content>
    </Wrapper>
  </HomePageDataProvider>
);
