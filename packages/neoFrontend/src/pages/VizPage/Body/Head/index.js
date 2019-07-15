import React from 'react';
import { ForkSVG, PullSVG, SettingsSVG, ShareSVG } from '../../../../svg';
import { Icon } from '../styles';
import { Wrapper, Right, Left } from './styles';
import { EditorToggler } from './EditorToggler';

export const Head = () => (
  <Wrapper>
    <Left>
      <EditorToggler />
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
