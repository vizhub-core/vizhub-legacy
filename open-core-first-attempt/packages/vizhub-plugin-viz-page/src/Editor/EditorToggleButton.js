import React, { useState } from 'react';
import { ArrowSVG } from 'vizhub-core';
import { ToggleButton } from './ToggleButton';

export const EditorToggleButton = () => {
  // TODO move this state into the URL.
  // https://github.com/stamen/pleth/blob/master/packages/examples/src/pleth/useURLState.js
  // https://developer.mozilla.org/en-US/docs/Web/API/History/pushState

  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <ToggleButton
      className="editor-toggle-button"
      isSelected={isEditorOpen}
      onChange={setIsEditorOpen}
    >
      <ArrowSVG left={isEditorOpen} />
      {isEditorOpen ? 'Close Editor' : 'Open Editor'}
    </ToggleButton>
  );
};
