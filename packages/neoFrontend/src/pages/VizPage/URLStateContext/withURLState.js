import React from 'react';
import { withRouter } from 'react-router';
import { accessors } from './accessors';

// Higher order component exposing URL state accessors.
export const withURLState = Component =>
  withRouter(props => {
    // Raw accessor functions for URL parameter state.
    const { edit, setEdit, file: activeFile, setFile } = accessors(props);

    // Boolean value, whether or not the editor should be shown.
    const showEditor = edit !== undefined;
    const setShowEditor = value => setEdit(value ? null : undefined);

    // Toggles the editor to show and hide.
    const toggleEditor = () => {
      setShowEditor(!showEditor);
      window.dispatchEvent(new Event('editorToggled'));
    };

    // The active editor section id string if a section is active.
    // null if no editor section is active.
    const activeSection = edit;

    // Accepts a section id string.
    const setActiveSection = setEdit;

    // Invoked when a file is selected (clicked on).
    const setActiveFile = selectedFile => {
      setFile(selectedFile === activeFile ? undefined : selectedFile);

      // Trigger viz runner to update its size.
      window.dispatchEvent(new Event('editorToggled'));
    };

    // The ID of the visualization we are viewing.
    const vizId = props.match.params.vizId;

    // Derived accessors for URL state, exposed to components.
    const urlState = {
      activeFile,
      setActiveFile,
      showEditor,
      toggleEditor,
      activeSection,
      setActiveSection,
      vizId
    };

    // Expose accessors to wrapped component as urlState prop.
    return <Component urlState={urlState} {...props} />;
  });
