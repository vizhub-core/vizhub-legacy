import React from 'react';
import {
  SETTINGS_BUTTON,
  NEW_BUTTON,
  EXPORT_BUTTON,
  DELETE_BUTTON
} from '../constants';
import { SettingsTop } from './SettingsTop';
import { NewTop } from './NewTop';
import { ExportTop } from './ExportTop';
import { DeleteTop } from './DeleteTop';
import { Wrapper } from './styles';

export const Top = ({
  vizId,
  activeFile,
  activeButton,
  clearActiveButton,
  onNewFileListItemClick,
  onDeleteFileConfirm,
  onDeleteVizConfirm
}) => (
  <Wrapper>
    {activeButton === SETTINGS_BUTTON ? (
      <SettingsTop />
    ) : activeButton === NEW_BUTTON ? (
      <NewTop onNewFileListItemClick={onNewFileListItemClick} />
    ) : activeButton === EXPORT_BUTTON ? (
      <ExportTop vizId={vizId} />
    ) : activeButton === DELETE_BUTTON ? (
      <DeleteTop
        onNoClick={clearActiveButton}
        onDeleteConfirm={activeFile ? onDeleteFileConfirm : onDeleteVizConfirm}
        activeFile={activeFile}
      />
    ) : null}
  </Wrapper>
);
