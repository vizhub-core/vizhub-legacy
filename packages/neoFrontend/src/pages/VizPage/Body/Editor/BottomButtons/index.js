import React, { useState, useContext, useCallback } from 'react';
import { withTheme } from 'styled-components';
import { showEditorSettings } from '../../../../../featureFlags';
import { SettingsSVG, NewSVG, ExportSVG } from '../../../../../svg';
import { deleteFileOp } from '../../../../../accessors';
import {
  sidebarSettingsTooltip,
  sidebarNewTooltip,
  sidebarExportTooltip
} from '../../../../../constants';
import { AuthContext } from '../../../../../authentication';
import { VizContext } from '../../../VizContext';
import { PrivacyContext } from '../../../PrivacyContext';
import { URLStateContext } from '../../../URLStateContext';
import { Wrapper, BottomButton, ClickableOverlay, Top, Bottom } from './styles';
import { SettingsTop } from './SettingsTop';
import { NewTop } from './NewTop';
import { ExportTop } from './ExportTop';
import { DeleteTop } from './DeleteTop';
import { TrashIcon } from '../../TrashIcon';

const SETTINGS_BUTTON = 'settings';
const NEW_BUTTON = 'new';
const EXPORT_BUTTON = 'export';
const DELETE_BUTTON = 'delete';

export const BottomButtons = withTheme(
  ({ theme, activeFile, onNewFileClick }) => {
    const [activeButton, setActiveButton] = useState(null);

    const { viz$, submitVizContentOp } = useContext(VizContext);
    const { closeActiveFile } = useContext(URLStateContext);
    const showPrivacyModal = useContext(PrivacyContext);
    const { me } = useContext(AuthContext);

    const onButtonClick = useCallback(
      buttonId => () => {
        setActiveButton(activeButton === buttonId ? null : buttonId);
      },
      [setActiveButton, activeButton]
    );

    const clearActiveButton = useCallback(() => {
      setActiveButton(null);
    }, [setActiveButton]);

    const onNewFileListItemClick = useCallback(() => {
      clearActiveButton();
      onNewFileClick();
    }, [clearActiveButton, onNewFileClick]);

    const onDeleteConfirm = useCallback(() => {
      const op = deleteFileOp(viz$.getValue(), activeFile);
      closeActiveFile();
      clearActiveButton();
      submitVizContentOp(op);
    }, [
      activeFile,
      viz$,
      submitVizContentOp,
      closeActiveFile,
      clearActiveButton
    ]);

    const onPrivacyClick = useCallback(() => {
      clearActiveButton();
      showPrivacyModal();
    }, [clearActiveButton, showPrivacyModal]);

    return (
      <Wrapper>
        <Top>
          {activeButton === SETTINGS_BUTTON ? (
            <SettingsTop onPrivacyClick={onPrivacyClick} />
          ) : activeButton === NEW_BUTTON ? (
            <NewTop onNewFileListItemClick={onNewFileListItemClick} />
          ) : activeButton === EXPORT_BUTTON ? (
            <ExportTop />
          ) : activeButton === DELETE_BUTTON ? (
            <DeleteTop
              onNoClick={clearActiveButton}
              onDeleteConfirm={onDeleteConfirm}
              theme={theme}
              activeFile={activeFile}
            />
          ) : null}
        </Top>
        <Bottom>
          {showEditorSettings(me) ? (
            <BottomButton
              isActive={activeButton === SETTINGS_BUTTON}
              className="test-editor-settings"
              title={sidebarSettingsTooltip}
            >
              <ClickableOverlay onClick={onButtonClick(SETTINGS_BUTTON)}>
                <SettingsSVG />
              </ClickableOverlay>
            </BottomButton>
          ) : null}
          <BottomButton
            isActive={activeButton === NEW_BUTTON}
            activeColor={'#3866e9'}
            title={sidebarNewTooltip}
          >
            <ClickableOverlay onClick={onButtonClick(NEW_BUTTON)}>
              <NewSVG />
            </ClickableOverlay>
          </BottomButton>
          <BottomButton
            isActive={activeButton === EXPORT_BUTTON}
            title={sidebarExportTooltip}
          >
            <ClickableOverlay onClick={onButtonClick(EXPORT_BUTTON)}>
              <ExportSVG />
            </ClickableOverlay>
          </BottomButton>
          {activeFile && activeFile !== 'bundle.js' ? (
            <BottomButton
              isActive={activeButton === DELETE_BUTTON}
              activeColor={theme.attentionGrabber}
            >
              <TrashIcon
                title="Delete this file"
                onClick={onButtonClick(DELETE_BUTTON)}
                iconComponent={ClickableOverlay}
              />
            </BottomButton>
          ) : null}
        </Bottom>
      </Wrapper>
    );
  }
);
