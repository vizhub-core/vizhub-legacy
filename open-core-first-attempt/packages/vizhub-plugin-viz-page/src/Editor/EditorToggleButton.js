import React, { useState } from 'react';
import { ToggleButton } from './ToggleButton';

export const EditorToggleButton = () => {
  // TODO move this state into the URL.
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <ToggleButton
      className="editor-toggle-button"
      isSelected={isEditorOpen}
      onChange={setIsEditorOpen}
    >
      {isEditorOpen ? 'Close Editor' : 'Open Editor'}
    </ToggleButton>
  );
};
