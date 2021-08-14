import React, { useContext } from 'react';
import { ArrowSVG, URLStateContext, classed } from 'vizhub-core';

const Wrapper = classed('editor-sidebar');

export const EditorSidebar = () => {
  const { isEditorOpen } = useContext(URLStateContext);

  return isEditorOpen ? <Wrapper /> : null;
};
