import React from 'react';
import { Wrapper, Content, Footer, FooterIcon } from './styles';
import { MiniSVG, FullSVG } from '../../../../svg';

export const VizFrame = () => (
  <Wrapper>
    <Content />
    <Footer>
      <FooterIcon leftmost={true}>
        <MiniSVG />
      </FooterIcon>
      <FooterIcon rightmost={true}>
        <FullSVG />
      </FooterIcon>
    </Footer>
  </Wrapper>
);
