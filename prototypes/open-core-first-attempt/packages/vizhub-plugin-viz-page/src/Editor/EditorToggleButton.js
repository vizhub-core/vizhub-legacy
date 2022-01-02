import React, { useState, useContext } from 'react';
import { ArrowSVG, URLStateContext } from 'vizhub-core';
import { ToggleButton } from './ToggleButton';

export const EditorToggleButton = () => {
  const { isEditorOpen, setIsEditorOpen } = useContext(URLStateContext);

  //console.log(JSON.stringify({ isEditorOpen, setIsEditorOpen }));

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
