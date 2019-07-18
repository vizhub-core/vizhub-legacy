import React from 'react';
import { MiniSVG, FullSVG } from '../../../../svg';
import { FooterIcon } from '../styles';
import { Wrapper, FullScreenFooter } from './styles';

export const FullScreen = ({ onExitFullScreen }) => (
  <Wrapper>
    <FullScreenFooter>
      <FooterIcon leftmost={true}>
        <MiniSVG />
      </FooterIcon>
      <FooterIcon rightmost={true} onClick={onExitFullScreen}>
        <FullSVG />
      </FooterIcon>
    </FullScreenFooter>
  </Wrapper>
);
