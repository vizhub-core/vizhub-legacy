import React, { useContext } from 'react';
import { ForkSVG, PullSVG, SettingsSVG, ShareSVG } from '../../../../svg';
import { WarningContext } from '../../WarningContext';
import { Wrapper, Left, Center, Right, HeadIcon } from './styles';
import { EditorToggler } from './EditorToggler';

export const Head = ({ onFork, showRight }) => {
  const { warning } = useContext(WarningContext);
  return (
    <Wrapper warning={warning}>
      <Left>
        <EditorToggler />
      </Left>
      {warning ? <Center>{warning}</Center> : null}
      {showRight ? (
        <Right>
          <HeadIcon title="Create a Pull Request">
            <PullSVG />
          </HeadIcon>
          <HeadIcon
            title="Fork this Viz"
            onClick={onFork}
            className="test-fork"
          >
            <ForkSVG />
          </HeadIcon>
          <HeadIcon title="Share this Viz">
            <ShareSVG />
          </HeadIcon>
          <HeadIcon title="Settings" rightmost={true}>
            <SettingsSVG />
          </HeadIcon>
        </Right>
      ) : null}
    </Wrapper>
  );
};
