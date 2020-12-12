import React from 'react';
import { Button } from '../../Button';
import { NavBar } from '../../NavBar';
import { Vizzes } from '../../VizzesGrid/Vizzes';
import { Wrapper, Content } from '../styles';
import { FromScratchSection } from './FromScratchSection';
import { useTemplates } from './useTemplates';
import {
  AttentionGrabbingTitle,
  Centered,
  Subtitle,
  LearnMoreLink,
  SectionTitle,
} from './styles';

const TEMPLATE_IDS = [
  '469e558ba77941aa9e1b416ea521b0aa',
  'c3b14112dae34ef395999cef5783324f',
  '118d7f70085246a58dc7a374fd957c20',
  '6ec4f3dd10ac4fcdb5f759d38e7ceefa',
  '677ffb85975648b6a92b1cdccf3a1964',
  '32dfc8d2393844c6a5b9d199d9a35946',
  '3d631093c2334030a6b27fa979bb4a0d',
  'f1c25845b6324832957d3bac6f10ba69',
  'e3f5f029b82f44a084d73806feafc577',
  '8b699c4000704216a709adfeb38f2411',
];

export const CreateVizPage = () => {
  const templatesData = useTemplates(TEMPLATE_IDS);

  return (
    <>
      <NavBar />
      <Wrapper>
        <Content>
          <Centered>
            <AttentionGrabbingTitle>
              Create a Visualization!
            </AttentionGrabbingTitle>
            <Subtitle>
              Create a new visualization from a template or fork one from our
              users.
            </Subtitle>
            <LearnMoreLink
              href="https://datavis.tech/vizhub/#using-vizhub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>Learn more</Button>
            </LearnMoreLink>
            <SectionTitle>Starters</SectionTitle>
            <SectionTitle>
              D3 Examples from{' '}
              <a href="https://curran.github.io/dataviz-course-2018/">
                Data Visualization Course 2018
              </a>
            </SectionTitle>
            <SectionTitle>
              D3 + React Examples from{' '}
              <a href="https://vizhub.com/datavis-2020">Datavis 2020</a>
            </SectionTitle>
            <SectionTitle>
              Community Templates - any recommendations?
            </SectionTitle>
            <SectionTitle>Most Forked</SectionTitle>
            <Vizzes {...templatesData} />
            <FromScratchSection />
          </Centered>
        </Content>
      </Wrapper>
    </>
  );
};
