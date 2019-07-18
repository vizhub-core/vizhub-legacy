import React from 'react';
import { MiniSVG, FullSVG } from '../../../../svg';
import { FooterIcon } from '../styles';
import { Wrapper, FullScreenFooter } from './styles';
import { VizContent } from '../VizContent';

// TODO useDimensions and make sizing and scaling correct.
export const FullScreen = ({ onExitFullScreen }) => (
  <Wrapper>
    <VizContent height={500} />
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
