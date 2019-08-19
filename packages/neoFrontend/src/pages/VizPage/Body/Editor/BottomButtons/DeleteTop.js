import React from 'react';
import { ClickableOverlay, TopMessage, TopOptions, TopOption } from './styles';
export const DeleteTop = ({ onNoClick, onDeleteConfirm, theme }) => (
  <>
    <TopMessage>Are you sure you want to delete this file?</TopMessage>
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
);
