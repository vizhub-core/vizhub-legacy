import React from 'react';
import { LoadingScreen } from '../../LoadingScreen';
import { NavBar } from '../../NavBar';
import { VizPreviews, VizPreview } from '../../VizPreview/styles';
import { Wrapper, Content } from '../styles';
import { CreateVizPageDataProvider } from './CreateVizPageDataContext';
import { FromScratchSection } from './FromScratchSection';
import { AttentionGrabbingTitle, Centered, Subtitle } from './styles';

// Temporary setup for first pass at template listing.
const userName = 'curran';
const visualizationInfos = [
  { id: '469e558ba77941aa9e1b416ea521b0aa', title: 'HTML Starter' },
  { id: 'c3b14112dae34ef395999cef5783324f', title: 'React Starter' },
  { id: '118d7f70085246a58dc7a374fd957c20', title: 'Sized Points on a Map' },
  {
    id: '6ec4f3dd10ac4fcdb5f759d38e7ceefa',
    title: 'Loading and Parsing CSV Data'
  },
  { id: '677ffb85975648b6a92b1cdccf3a1964', title: 'Vega-Lite API Template' },
  { id: '32dfc8d2393844c6a5b9d199d9a35946', title: 'Stylized Bar Chart' },
  { id: '3d631093c2334030a6b27fa979bb4a0d', title: 'Stylized Scatter Plot' },
  { id: 'f1c25845b6324832957d3bac6f10ba69', title: 'Stylized Line Chart' },
  {
    id: 'e3f5f029b82f44a084d73806feafc577',
    title: 'Polished Scatter Plot with Menus'
  },
  { id: '8b699c4000704216a709adfeb38f2411', title: 'Interactive Color Legend' }
];

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
            Create a new visualization from a template or fork one from our
            users.
          </Subtitle>
          <VizPreviews>
            {visualizationInfos.map(({ id, title }) => (
              <VizPreview
                key={id}
                to={`/${userName}/${id}`}
                title={title}
                style={{
                  backgroundImage: `url(/api/visualization/thumbnail/${id}.png)`
                }}
              />
            ))}
          </VizPreviews>
          <FromScratchSection />
        </Centered>
      </Content>
    </Wrapper>
  </CreateVizPageDataProvider>
);
