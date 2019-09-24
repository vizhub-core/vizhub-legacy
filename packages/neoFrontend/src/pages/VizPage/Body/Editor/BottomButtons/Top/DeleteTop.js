import React from 'react';
import { withTheme } from 'styled-components';
import { ClickableOverlay } from '../styles';
import { TopMessage, TopOptions, TopOption } from './styles';
export const DeleteTop = withTheme(
  ({ onNoClick, onDeleteConfirm, theme, activeFile }) => (
    <>
      <TopMessage>
        Are you sure you want to delete{' '}
        {activeFile ? `the file ${activeFile}` : 'this entire visualization'}?
      </TopMessage>
      <TopOptions>
        <TopOption>
          <ClickableOverlay onClick={onNoClick}>no</ClickableOverlay>
        </TopOption>
        <TopOption rightmost={true}>
          <ClickableOverlay
            color={theme.attentionGrabber}
            onClick={onDeleteConfirm}
          >
            yes
          </ClickableOverlay>
        </TopOption>
      </TopOptions>
    </>
  )
);
