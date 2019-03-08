import React from 'react';
import { withRouter } from 'react-router';
import { accessors } from './accessors';

// Higher order component exposing URL state accessors.
export const withURLState = Component =>
  withRouter(props => {
    // Raw accessor functions for URL parameter state.
    const { edit, setEdit, file, setFile } = accessors(props);

    // Boolean value, whether or not the configurator should be shown.
    const showConfigurator = edit !== undefined;
    const setShowConfigurator = value => setEdit(value ? null : undefined);

    // Toggles the configurator to show and hide.
    const toggleConfigurator = () => setShowConfigurator(!showConfigurator);

    // The active configurator section id string if a section is active.
    // null if no configurator section is active.
    const activeSection = edit;

    // Accepts a section id string.
    const setActiveSection = setEdit;

    // Invoked when a file is selected (clicked on).
    const selectFile = selectedFile => () =>
      setFile(selectedFile === file ? undefined : selectedFile);

    // Derived accessors for URL state, exposed to components.
    const urlState = {
      file,
      selectFile,
      showConfigurator,
      toggleConfigurator,
      activeSection,
      setActiveSection
    };

    // Expose accessors to wrapped component as urlState prop.
    return <Component urlState={urlState} {...props} />;
  });
