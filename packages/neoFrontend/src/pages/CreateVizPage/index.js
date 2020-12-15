import React from 'react';
import { isProd } from '../../constants';
//import { Button } from '../../Button';
import { NavBar } from '../../NavBar';
import { Vizzes } from '../../VizzesGrid/Vizzes';
import { Wrapper, Content } from '../styles';
import { FromScratchSection } from './FromScratchSection';
import { useTemplates } from './useTemplates';
import {
  starters,
  communityTemplates,
  datavis2018Templates,
  datavis2020Templates,
} from './curatedVizzes';
import {
  //AttentionGrabbingTitle,
  Centered,
  //Subtitle,
  //LearnMoreLink,
  Section,
  SectionTitle,
} from './styles';

// Sanity check during development.
const checkForDuplicates = (ids) => {
  const lookup = {};
  ids.forEach((id) => {
    if (lookup[id]) {
      console.log('duplicate id: ' + id);
    }
    lookup[id] = true;
  });
};

const CuratedVizzes = ({ children, ids }) => {
  if (!isProd) {
    checkForDuplicates(ids);
  }
  const { usersById, visualizationInfos } = useTemplates(ids);
  return (
    <Section>
      <SectionTitle>{children}</SectionTitle>
      <Vizzes usersById={usersById} visualizationInfos={visualizationInfos} />
    </Section>
  );
};

export const CreateVizPage = () => {
  return (
    <>
      <NavBar />
      <Wrapper>
        <Content>
          <Centered>
            {
              //    <AttentionGrabbingTitle>
              //      Create a Visualization!
              //    </AttentionGrabbingTitle>
              //    <Subtitle>
              //      Create a new visualization from a template or fork one from our
              //      users.
              //    </Subtitle>
              //    <LearnMoreLink
              //      href="https://datavis.tech/vizhub/#using-vizhub"
              //      target="_blank"
              //      rel="noopener noreferrer"
              //    >
              //      <Button>Learn more</Button>
              //    </LearnMoreLink>
            }
            <CuratedVizzes ids={starters}>Starters</CuratedVizzes>
            <CuratedVizzes ids={communityTemplates}>
              Community Templates
            </CuratedVizzes>
            <CuratedVizzes ids={datavis2018Templates}>
              D3 Examples from{' '}
              <a href="https://curran.github.io/dataviz-course-2018/">
                Data Visualization Course 2018
              </a>
            </CuratedVizzes>
            <CuratedVizzes ids={datavis2020Templates}>
              D3 & React Examples from{' '}
              <a href="https://vizhub.com/datavis-2020">Datavis 2020</a>
            </CuratedVizzes>
            <FromScratchSection />
          </Centered>
        </Content>
      </Wrapper>
    </>
  );
};
