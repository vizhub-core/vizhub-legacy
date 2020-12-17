import React, { useContext, useEffect } from 'react';
import { sendEvent } from '../../../sendEvent';
import { URLStateContext } from '../URLStateContext';
import { VizPageDataContext } from '../VizPageDataContext';
import { modes } from '../URLStateContext/modes';
import { FullScreenModePresenter } from './FullScreenModePresenter';
import { EmbedModePresenter } from './EmbedModePresenter';
import { EditorModePresenter } from './EditorModePresenter';
import { SnippetModePresenter } from './SnippetModePresenter';

const modePresentersMap = {
  [modes.full]: FullScreenModePresenter,
  [modes.embed]: EmbedModePresenter,
  [modes.snippet]: SnippetModePresenter,
  [modes.mini]: EditorModePresenter,
  [modes.micro]: EditorModePresenter,
  [modes.hide]: EditorModePresenter,
  [modes.viewer]: EditorModePresenter,
};

export const Body = () => {
  const { mode, vizId } = useContext(URLStateContext);
  const { ownerUser } = useContext(VizPageDataContext);

  useEffect(() => {
    sendEvent([
      'event',
      'event.pageview',
      'event.pageview.viz',
      `event.pageview.viz.owner:${ownerUser.id}`,
      `event.pageview.viz.viz:${vizId}`,
    ]);
  }, [ownerUser.id, vizId]);

  const VizModePresenter = modePresentersMap[mode] || EditorModePresenter;

  return <VizModePresenter />;
};
