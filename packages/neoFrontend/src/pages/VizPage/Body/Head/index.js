import React, { useContext } from 'react';
import { ForkSVG, PullSVG, SettingsSVG, ShareSVG } from '../../../../svg';
import {
  showHeadPullRequest,
  showHeadShare,
  showHeadSettings
} from '../../../../featureFlags';
import { WarningContext } from '../../WarningContext';
import { ForkingContext } from '../../ForkingContext';
import { DeleteVizContext } from '../../DeleteVizContext';
import { Wrapper, Left, Center, Right, HeadIcon } from './styles';
import { EditorToggler } from './EditorToggler';
import { TrashIcon } from '../TrashIcon';

export const Head = ({ showRight }) => {
  const onFork = useContext(ForkingContext);
  const onDeleteViz = useContext(DeleteVizContext);
  const { warning } = useContext(WarningContext);
  return (
    <Wrapper warning={warning}>
      <Left>
        <EditorToggler />
      </Left>
      {warning ? <Center>{warning}</Center> : null}
      {showRight ? (
        <Right>
          {showHeadPullRequest ? (
            <HeadIcon title="Create a Pull Request">
              <PullSVG />
            </HeadIcon>
          ) : null}
          <HeadIcon
            title="Fork this viz"
            onClick={onFork}
            className="test-fork"
          >
            <ForkSVG />
          </HeadIcon>
          <TrashIcon
            title="Delete this viz"
            onClick={onDeleteViz}
            iconComponent={HeadIcon}
          />
          {showHeadShare ? (
            <HeadIcon title="Share this viz">
              <ShareSVG />
            </HeadIcon>
          ) : null}
          {showHeadSettings ? (
            <HeadIcon title="Settings" rightmost={true}>
              <SettingsSVG />
            </HeadIcon>
          ) : null}
        </Right>
      ) : null}
    </Wrapper>
  );
};
