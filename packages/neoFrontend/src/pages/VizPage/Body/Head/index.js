import React, { useContext, useCallback } from 'react';
import { getVizOwner, getVizInfo } from 'vizhub-presenters';
import { ForkSVG, PullSVG, SettingsSVG, ShareSVG } from '../../../../svg';
import {
  showHeadPullRequest,
  showHeadShare,
  showPrivacySettings
} from '../../../../featureFlags';
import { useValue } from '../../../../useValue';
import { AuthContext } from '../../../../authentication/AuthContext';
import { WarningContext } from '../../WarningContext';
import { ForkingContext } from '../../ForkingContext';
import { DeleteVizContext } from '../../DeleteVizContext';
import { VizContext } from '../../VizContext';
import { SettingsContext } from '../../SettingsContext';

import { Wrapper, Left, Center, Right, HeadIcon } from './styles';
import { EditorToggler } from './EditorToggler';
import { TrashIcon } from '../TrashIcon';

export const Head = ({ showRight }) => {
  const onFork = useContext(ForkingContext);
  const onDeleteViz = useContext(DeleteVizContext);
  const { warning } = useContext(WarningContext);
  const { me } = useContext(AuthContext);
  const { viz$ } = useContext(VizContext);
  const vizInfo = useValue(viz$, getVizInfo);
  const showSettingsModal = useContext(SettingsContext);
  const owner = useValue(viz$, getVizOwner);

  const showHeadTrash = me && me.id === owner;

  const onSettingsClick = useCallback(() => {
    console.log('here');
    showSettingsModal();
  }, [showSettingsModal]);

  return (
    <Wrapper warning={warning}>
      <Left>
        <EditorToggler />
      </Left>
      {warning ? <Center>{warning}</Center> : null}
      {showRight ? (
        <Right>
          {showPrivacySettings(me, vizInfo) ? (
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
        </Right>
      ) : null}
    </Wrapper>
  );
};
