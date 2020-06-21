import React, { useContext, useCallback } from 'react';
import { getVizOwner, getVizForksCount } from 'vizhub-presenters';
import { ForkSVG, PullSVG, SettingsSVG, ShareSVG } from '../../../../svg';
import { showHeadPullRequest, showHeadShare } from '../../../../featureFlags';
import { useValue } from '../../../../useValue';
import { AuthContext } from '../../../../authentication/AuthContext';
import { WarningContext } from '../../WarningContext';
import { ForkingContext } from '../../ForkingContext';
import { DeleteVizContext } from '../../DeleteVizContext';
import { VizContext } from '../../VizContext';
import { SettingsContext } from '../../SettingsContext';
import { ShareContext } from '../../ShareContext';

import { Wrapper, Left, Center, Right, HeadIcon, Counter } from './styles';
import { EditorToggler } from './EditorToggler';
import { TrashIcon } from '../TrashIcon';

export const Head = ({ showRight }) => {
  const onFork = useContext(ForkingContext);
  const onDeleteViz = useContext(DeleteVizContext);
  const { warning } = useContext(WarningContext);
  const { me } = useContext(AuthContext);
  const { viz$ } = useContext(VizContext);
  const showSettingsModal = useContext(SettingsContext);
  const showShareModal = useContext(ShareContext);
  const owner = useValue(viz$, getVizOwner);
  const forksCount = useValue(viz$, getVizForksCount);

  const showHeadTrash = me && me.id === owner;
  const showHeadSettings = showHeadTrash;

  const onSettingsClick = useCallback(() => {
    showSettingsModal();
  }, [showSettingsModal]);

  const onShareClick = useCallback(() => {
    showShareModal();
  }, [showShareModal]);

  return (
    <Wrapper warning={warning}>
      <Left>
        <EditorToggler />
      </Left>
      {warning ? <Center>{warning}</Center> : null}
      {showRight ? (
        <Right>
          {showHeadShare ? (
            <HeadIcon title="Share this viz" onClick={onShareClick}>
              <ShareSVG />
            </HeadIcon>
          ) : null}
          {showHeadSettings ? (
            <HeadIcon
              title="Settings"
              onClick={onSettingsClick}
              className="test-settings"
            >
              <SettingsSVG />
            </HeadIcon>
          ) : null}
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
            {forksCount > 0 && <Counter>{forksCount}</Counter> }
          </HeadIcon>
          {showHeadTrash ? (
            <TrashIcon
              title="Delete this viz"
              onClick={onDeleteViz}
              iconComponent={HeadIcon}
            />
          ) : null}
        </Right>
      ) : null}
    </Wrapper>
  );
};
