import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../../authentication';
import { sendEvent } from '../../sendEvent';
//import { Button } from '../../Button';
import { NavBar } from '../../NavBar';
import { Wrapper, Content } from '../styles';
import { FromScratchSection } from './FromScratchSection';
import {
  starters,
  communityTemplates,
  mostForked,
  datavis2018Templates,
  datavis2020Templates,
} from './vizLists';
import { CuratedVizzes } from './CuratedVizzes';
import { AttentionGrabbingTitle, Centered, Subtitle } from './styles';

export const CreateVizPage = () => {
  const { me } = useContext(AuthContext);
  const viewer = (me && me.id) || 'anonymous';
  useEffect(() => {
    sendEvent(`event.pageview.create-viz.viewer:${viewer}`);
  }, [viewer]);

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
            <AttentionGrabbingTitle>Create a Viz</AttentionGrabbingTitle>
            <Subtitle>
              by forking one of these{' '}
              <span role="img" aria-label="look below">
                👇
              </span>{' '}
            </Subtitle>
            <CuratedVizzes ids={starters}>Starters</CuratedVizzes>
            <CuratedVizzes ids={communityTemplates}>
              Community Templates
            </CuratedVizzes>
            <CuratedVizzes
              ids={mostForked}
              more="https://vizhub.com/?sort=mostForked"
            >
              Most Forked
            </CuratedVizzes>
            <CuratedVizzes ids={datavis2020Templates}>
              D3 & React Examples from{' '}
              <a href="https://vizhub.com/datavis-2020">Datavis 2020</a>
            </CuratedVizzes>
            <CuratedVizzes ids={datavis2018Templates}>
              D3 Examples from{' '}
              <a href="https://curran.github.io/dataviz-course-2018/">
                Data Visualization Course 2018
              </a>
            </CuratedVizzes>
            <FromScratchSection />
          </Centered>
        </Content>
      </Wrapper>
    </>
  );
};
