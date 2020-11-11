import React from 'react';
import { NavBar } from '../../NavBar';
import { Wrapper, Content, CopyWrapper } from '../styles';
import { Entry } from './styles';
import { data } from './data';

export const Datavis2020Page = () => {
  return (
    <Wrapper>
      <Content>
        <NavBar />
        <CopyWrapper>Datavis 2020</CopyWrapper>
        {data.map(({ title, blogPostURL, vizURL, youTubeURL }) => (
          <Entry>{title}</Entry>
        ))}
      </Content>
    </Wrapper>
  );
};
