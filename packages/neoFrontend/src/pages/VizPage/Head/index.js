import React from 'react';
import { Wrapper, Right, Left, Icon } from './styles';

import {
  ForkSVG,
  PullSVG,
  SettingsSVG,
  ShareSVG,
  ArrowLeftSVG,
  ArrowRightSVG
} from '../../../svg';

export const Head = () => (
  <Wrapper>
    <Left>
      <ArrowLeftSVG />
      <ArrowRightSVG />
    </Left>
    <Right>
      <Icon>
        <PullSVG />
      </Icon>
      <Icon>
        <ForkSVG />
      </Icon>
      <Icon>
        <ShareSVG />
      </Icon>
      <Icon rightmost={true}>
        <SettingsSVG />
      </Icon>
    </Right>
  </Wrapper>
);
