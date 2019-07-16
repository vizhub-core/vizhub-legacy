import React, { useContext } from 'react';
import { NavBar } from '../../../NavBar';
import { VizPageDataContext } from '../VizPageDataContext';
import { Wrapper, Bottom, TorsoWrapper, Torso, HorizontalRule } from './styles';
import { Head } from './Head';
import { VizFrame } from './VizFrame';
import { TitleBar } from './TitleBar';
import { DescriptionSection } from './DescriptionSection';

export const Body = () => {
  console.log(useContext(VizPageDataContext));
  const {
    visualization: {
      info: { title },
    },
    ownerUser: { fullName }
  } = useContext(VizPageDataContext);


  return (
    <Wrapper>
      <NavBar />
      <Head />
      <Bottom>
        <TorsoWrapper>
          <Torso>
            <VizFrame />
            <TitleBar title={title}/>
            <HorizontalRule />
            <DescriptionSection fullName={fullName}/>
            <HorizontalRule />
          </Torso>
        </TorsoWrapper>
      </Bottom>
    </Wrapper>
  );
};
