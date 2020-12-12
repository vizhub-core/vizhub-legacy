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
} from './styles';

 // TODO: Curran define ids for templates here
const TEMPLATE_IDS = [];

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
            <Vizzes {...templatesData} />
            <FromScratchSection />
          </Centered>
        </Content>
      </Wrapper>
    </>
  );
};
