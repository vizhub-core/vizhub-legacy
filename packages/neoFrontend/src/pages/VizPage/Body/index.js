import React, { useContext } from 'react';
import { URLStateContext } from '../URLStateContext';
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
  const { mode } = useContext(URLStateContext);

  const VizModePresenter = modePresentersMap[mode] || EditorModePresenter;

  return <VizModePresenter />;
};
