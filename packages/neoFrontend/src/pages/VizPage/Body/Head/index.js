import React, { useContext } from 'react';
import { getVizOwner } from 'vizhub-presenters';
import { ForkSVG, PullSVG, SettingsSVG, ShareSVG } from '../../../../svg';
import {
  showHeadPullRequest,
  showHeadShare,
  showHeadSettings
} from '../../../../featureFlags';
import { useValue } from '../../../../useValue';
import { AuthContext } from '../../../../authentication/AuthContext';
import { WarningContext } from '../../WarningContext';
import { ForkingContext } from '../../ForkingContext';
import { DeleteVizContext } from '../../DeleteVizContext';
import { VizContext } from '../../VizContext';

import { Wrapper, Left, Center, Right, HeadIcon } from './styles';
import { EditorToggler } from './EditorToggler';
import { TrashIcon } from '../TrashIcon';

export const Head = ({ showRight }) => {
  const onFork = useContext(ForkingContext);
  const onDeleteViz = useContext(DeleteVizContext);
  const { warning } = useContext(WarningContext);
  const { me } = useContext(AuthContext);
  const { viz$ } = useContext(VizContext);
  const owner = useValue(viz$, getVizOwner);

  const showHeadTrash = me && me.id === owner;

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
            rightmost={!showHeadTrash}
          >
            <ForkSVG />
          </HeadIcon>
          {showHeadTrash ? (
            <TrashIcon
              title="Delete this viz"
              onClick={onDeleteViz}
              iconComponent={HeadIcon}
            />
          ) : null}
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
