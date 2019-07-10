import React from 'react';
import { LoadingScreen } from '../../LoadingScreen';
import { AttentionGrabbingTitle, Centered, Subtitle } from './styles';
import { Wrapper, Content, Title, Button, DevsOnly } from '../styles';
import { CreateVizPageDataProvider } from './CreateVizPageDataContext';
import { NavBar } from '../../NavBar';

export const CreateVizPage = () => (
  <CreateVizPageDataProvider fallback={<LoadingScreen />}>
    <Wrapper>
      <Content>
        <NavBar />
        <Centered>
          <AttentionGrabbingTitle>
            Create a Visualization!
          </AttentionGrabbingTitle>
          <Subtitle>
            Create a new visualization from a VizHub template or fork one from
            our users.
          </Subtitle>
          {process.env.NODE_ENV === 'development' ? (
            <>
              <DevsOnly>
                <Title>For developers only</Title>
              </DevsOnly>
              <Button className="test-create-viz-from-scratch">
                From Scratch
              </Button>
            </>
          ) : null}
        </Centered>
      </Content>
    </Wrapper>
  </CreateVizPageDataProvider>
);
