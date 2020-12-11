import React from 'react';
import { Button } from '../../Button';
import { NavBar } from '../../NavBar';
import { Vizzes } from '../../VizzesGrid/Vizzes';
import { Wrapper, Content } from '../styles';
import { FromScratchSection } from './FromScratchSection';
import { useTemplatesData } from './useTemplatesData';
import {
  AttentionGrabbingTitle,
  Centered,
  Subtitle,
  LearnMoreLink,
} from './styles';

export const CreateVizPage = () => {
  const templatesData = useTemplatesData();

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
            <Vizzes {...templatesData} />
            <FromScratchSection />
          </Centered>
        </Content>
      </Wrapper>
    </>
  );
};
