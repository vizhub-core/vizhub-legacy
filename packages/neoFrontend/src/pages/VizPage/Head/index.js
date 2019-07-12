import React from 'react';
import { ForkSVG, PullSVG, SettingsSVG, ShareSVG } from '../../../svg';
import { Wrapper, Right, Left, Icon } from './styles';
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
