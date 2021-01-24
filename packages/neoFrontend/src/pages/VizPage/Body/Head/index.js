import React, { useContext, useCallback } from 'react';
import { getVizOwner, getVizCollaborators } from 'vizhub-presenters';
import {
  ForkSVG,
  PullSVG,
  SettingsSVG,
  ShareSVG,
  ExportSVG,
} from '../../../../svg';
import { showHeadPullRequest, showHeadShare } from '../../../../featureFlags';
import { useValue } from '../../../../useValue';
import { AuthContext } from '../../../../authentication/AuthContext';
import { WarningContext } from '../../../../WarningContext';
import { ForkingContext } from '../../ForkingContext';
import { DeleteVizContext } from '../../DeleteVizContext';
import { VizContext } from '../../VizContext';
import { SettingsContext } from '../../SettingsContext';
import { ShareContext } from '../../ShareContext';
import { URLStateContext } from '../../URLStateContext';

import { Wrapper, Left, Center, Right, HeadIcon, HeadLink } from './styles';
import { EditorToggler } from './EditorToggler';
import { TrashIcon } from '../TrashIcon';

const getCollaboratorIds = (viz) => (
  getVizCollaborators(viz).map(({ userId }) => userId)
);

export const Head = ({ showRight }) => {
  const { showForkModal } = useContext(ForkingContext);
  const onDeleteViz = useContext(DeleteVizContext);
  const { warning } = useContext(WarningContext);
  const { me } = useContext(AuthContext);
  const { viz$ } = useContext(VizContext);
  const showSettingsModal = useContext(SettingsContext);
  const showShareModal = useContext(ShareContext);
  const { vizId } = useContext(URLStateContext);
  const owner = useValue(viz$, getVizOwner);
  const collaboratorIds = useValue(viz$, getCollaboratorIds);

  let showHeadTrash = false;
  let showHeadSettings = false;
  if (me) {
    showHeadTrash = me.id === owner;
    showHeadSettings = showHeadTrash || collaboratorIds.includes(me.id);
  }

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
          <HeadLink
            href={`/api/visualization/export/${vizId}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Export the code for this viz"
          >
            <HeadIcon title="Export">
              <ExportSVG />
            </HeadIcon>
          </HeadLink>
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
            onClick={showForkModal}
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
        </Right>
      ) : null}
    </Wrapper>
  );
};
