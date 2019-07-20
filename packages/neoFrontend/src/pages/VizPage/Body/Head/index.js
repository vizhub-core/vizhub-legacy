import React from 'react';
import { ForkSVG, PullSVG, SettingsSVG, ShareSVG } from '../../../../svg';
import { Wrapper, Right, Left, HeadIcon } from './styles';
import { EditorToggler } from './EditorToggler';

export const Head = ({ onFork }) => (
  <Wrapper>
    <Left>
      <EditorToggler />
    </Left>
    <Right>
      <HeadIcon title="Create a Pull Request">
        <PullSVG />
      </HeadIcon>
      <HeadIcon title="Fork this Viz" onClick={onFork} className="test-fork">
        <ForkSVG />
      </HeadIcon>
      <HeadIcon title="Share this Viz">
        <ShareSVG />
      </HeadIcon>
      <HeadIcon title="Settings" rightmost={true}>
        <SettingsSVG />
      </HeadIcon>
    </Right>
  </Wrapper>
);
