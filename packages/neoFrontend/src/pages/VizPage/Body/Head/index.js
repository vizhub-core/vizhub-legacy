import React from 'react';
import { ForkSVG, PullSVG, SettingsSVG, ShareSVG } from '../../../../svg';
import { Icon } from '../styles';
import { Wrapper, Right, Left } from './styles';
import { EditorToggler } from './EditorToggler';

export const Head = ({ onFork }) => (
  <Wrapper>
    <Left>
      <EditorToggler />
    </Left>
    <Right>
      <Icon title="Create a Pull Request">
        <PullSVG />
      </Icon>
      <Icon title="Fork this Viz" onClick={onFork} className="test-fork">
        <ForkSVG />
      </Icon>
      <Icon title="Share this Viz">
        <ShareSVG />
      </Icon>
      <Icon title="Settings" rightmost={true}>
        <SettingsSVG />
      </Icon>
    </Right>
  </Wrapper>
);
