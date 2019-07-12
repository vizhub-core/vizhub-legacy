import React, { useContext } from 'react';
import { NavBar } from '../../../NavBar';
import { Wrapper, Content } from '../../styles';
import { URLStateContext } from '../URLStateContext';
import { Head } from './Head';

export const Body = () => {
  // TODO move this access logic into useVizPageData
  const { vizId } = useContext(URLStateContext);
  return (
    <>
      <NavBar />
      <Head />
      <Wrapper>
        <Content>Hello viz {vizId}!</Content>
      </Wrapper>
    </>
  );
};
